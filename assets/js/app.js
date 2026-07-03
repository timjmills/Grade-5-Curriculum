(function(){
  var me=document.currentScript.src;
  var s=document.createElement('script'); s.src=me.replace('app.js','data.js');
  s.onload=init; document.head.appendChild(s);

  var SUBJ_COLORS={Reading:'#3c8d40',Grammar:'#3f6bb5',Writing:'#5b8fd6',Math:'#c96b1e',Explorer:'#22808f',Spelling:'#b08900',Vocabulary:'#b05580'};
  var UNITS={1:'The Amazing Body',2:'Changes in Matter',3:'Global Goods',4:'Our Past and Present',5:'Existing, Endangered, Extinct',6:'Earth, Space & Beyond',7:'Forces, Energy & Disasters'};
  var DAYS=['Sun','Mon','Tue','Wed','Thu'];
  function store(){ try{return JSON.parse(localStorage.getItem('g5-done')||'{}')}catch(e){return {}} }
  function save(s){ localStorage.setItem('g5-done', JSON.stringify(s)); }
  function offset(){ try{return JSON.parse(localStorage.getItem('g5-subj-off')||'[]')}catch(e){return []} }
  function saveOff(a){ localStorage.setItem('g5-subj-off', JSON.stringify(a)); }
  function pad(n){ return String(n).padStart(2,'0'); }

  function init(){
    // Drive buttons
    var links=window.DRIVE_LINKS||{};
    document.querySelectorAll('.drive-btn').forEach(function(b){
      var url=links[b.dataset.driveKey]; if(url){ b.href=url; b.hidden=false; }
    });
    // Current week banner (home)
    var cw=document.getElementById('current-week');
    if(cw && window.WEEKS){
      var iso=new Date().toISOString().slice(0,10);
      var w=window.WEEKS.find(function(w){return iso>=w.start && iso<=w.end;}), label='This week';
      if(!w){ w=window.WEEKS.find(function(w){return w.start>=iso;}); label='Next up'; }
      if(!w){ w=window.WEEKS[window.WEEKS.length-1]; label='Latest'; }
      cw.innerHTML='📅 <strong>'+label+':</strong> <a href="weeks/week-'+pad(w.n)+'.html">Week '+w.n+' — '+w.title+'</a> · '+w.dates;
      cw.hidden=false;
    }
    // Search (home)
    var inp=document.getElementById('search'), res=document.getElementById('search-results');
    if(inp && window.SEARCH_INDEX){
      inp.addEventListener('input', function(){
        var q=inp.value.trim().toLowerCase();
        if(q.length<2){ res.hidden=true; res.innerHTML=''; return; }
        var hits=window.SEARCH_INDEX.filter(function(e){return e.title.toLowerCase().indexOf(q)>-1||e.text.indexOf(q)>-1;}).slice(0,12);
        res.innerHTML=hits.length?hits.map(function(e){return '<a href="'+e.url+'">'+e.title+'</a>';}).join(''):'<a>No results</a>';
        res.hidden=false;
      });
      document.addEventListener('click',function(e){ if(!inp.contains(e.target)) res.hidden=true; });
    }
    if(window.LESSONS){ weekToggles(); progressPage(); }
  }

  // ---- week-page toggles ----
  function weekToggles(){
    var m=location.pathname.match(/week-(\d\d)\.html/); if(!m) return;
    var wk=parseInt(m[1],10), off=offset();
    var byKey={}; window.LESSONS.forEach(function(l){ if(l.w===wk) byKey[l.k]=l; });
    var done=store();
    function mkBtn(td,key,cls,onTxt,offTxt,dark){
      var b=document.createElement('button');
      b.className=cls+' no-print'; b.type='button';
      b.textContent=done[key]?onTxt:offTxt;
      if(cls==='done-toggle'&&done[key]) td.classList.add('done');
      if(cls==='spell-toggle'&&done[key]) b.classList.add('on');
      b.onclick=function(){
        var s=store();
        if(s[key]){ delete s[key]; b.textContent=offTxt; if(dark) td.classList.remove('done'); b.classList.remove('on'); }
        else { s[key]=1; b.textContent=onTxt; if(dark) td.classList.add('done'); if(cls==='spell-toggle') b.classList.add('on'); }
        save(s);
      };
      td.insertBefore(b, td.firstChild);
    }
    document.querySelectorAll('.doc .doc-table tr').forEach(function(tr){
      var tds=tr.children; if(!tds.length) return;
      var lab=(tds[0].textContent||'').trim().toUpperCase();
      var band=['READING','GRAMMAR','MATH','EXPLORER','VOCABULARY'].find(function(b){return lab.indexOf(b)===0;});
      if(!band) return;
      var col=0;
      for(var i=1;i<tds.length;i++){
        col+=(parseInt(tds[i-1].getAttribute('colspan'))||1);
        var day=DAYS[col-1]; if(!day) break;
        var td=tds[i];
        if(band==='VOCABULARY'){
          var vk='w'+pad(wk)+'|VOCAB|'+day, vl=byKey[vk];
          if(vl && off.indexOf(vl.s)<0){ td.classList.add('vocab-cell'); mkBtn(td,vk,'done-toggle','✓','mark done',true); }
          if(day==='Mon'||day==='Thu'){
            var svk='w'+pad(wk)+'|SPELL|'+day, svl=byKey[svk];
            if(svl && off.indexOf('Spelling')<0){ mkBtn(td,svk,'spell-toggle','🔡 ✓','🔡 spelling',false); }
          }
          continue;
        }
        var key='w'+pad(wk)+'|'+band+'|'+day, l=byKey[key];
        if(l && off.indexOf(l.s)<0){ td.classList.add('lesson-cell'); mkBtn(td,key,'done-toggle','✓','mark done',true); }
      }
    });
  }

  // ---- progress page ----
  function progressPage(){
    var ov=document.getElementById('prog-overall'); if(!ov) return;
    var ALLSUBJ=['Reading','Spelling','Vocabulary','Grammar','Writing','Math','Explorer'];
    render();
    function active(){ var off=offset(); return window.LESSONS.filter(function(l){return off.indexOf(l.s)<0;}); }
    function bar(d,t,c){ var p=t?Math.round(100*d/t):0;
      return '<div class="bar"><div style="width:'+p+'%'+(c?';background:'+c:'')+'"></div></div>'; }
    function render(){
      var off=offset(), done=store(), L=active();
      // chips
      document.getElementById('subj-filter').innerHTML=ALLSUBJ.map(function(s){
        var on=off.indexOf(s)<0;
        return '<button class="chip'+(on?' on':'')+'" style="--chip-c:'+SUBJ_COLORS[s]+'" data-s="'+s+'">'+(on?'✓ ':'')+s+'</button>';
      }).join('');
      document.querySelectorAll('#subj-filter .chip').forEach(function(ch){
        ch.onclick=function(){
          var o=offset(), s=ch.dataset.s, i=o.indexOf(s);
          if(i<0) o.push(s); else o.splice(i,1);
          saveOff(o); render();
        };
      });
      var dn=L.filter(function(l){return done[l.k];}).length;
      ov.innerHTML='<div class="prog-card"><strong>Whole year ('+L.length+' items tracked)</strong>'+bar(dn,L.length)+'<div class="prog-num">'+dn+' / '+L.length+' · '+(L.length?Math.round(100*dn/L.length):0)+'%</div></div>';
      // tabs
      document.querySelectorAll('.tab').forEach(function(t){
        t.onclick=function(){
          document.querySelectorAll('.tab').forEach(function(x){x.classList.toggle('active',x===t);});
          ['week','subject','unit'].forEach(function(k){ document.getElementById('tab-'+k).hidden=(t.dataset.tab!==k); });
        };
      });
      drawTab('week', function(l){return l.w;}, function(w){
        var meta=(window.WEEKS||[]).find(function(x){return x.n==w;})||{};
        return 'Week '+w+' — '+(meta.title||''); }, function(w){return 'weeks/week-'+pad(w)+'.html';});
      drawTab('subject', function(l){return l.s;}, function(s){return s;}, null, SUBJ_COLORS);
      drawTab('unit', function(l){return l.u;}, function(u){return 'Unit '+u+' — '+UNITS[u];}, null);
    }
    function drawTab(tab, keyf, titlef, urlf, colors){
      var done=store(), L=active(), groups={}, order=[];
      L.forEach(function(l){ var k=keyf(l); if(!groups[k]){groups[k]=[];order.push(k);} groups[k].push(l); });
      var el=document.getElementById('tab-'+tab);
      el.innerHTML=order.map(function(k){
        var g=groups[k], d=g.filter(function(l){return done[l.k];}).length;
        var c=colors?colors[k]:null;
        return '<div class="drill" data-k="'+k+'"><button><span class="arrow">▸</span><span class="ttl">'+titlef(k)+'</span>'
          +bar(d,g.length,c)+'<span class="prog-num">'+d+' / '+g.length+'</span>'
          +(urlf?'<a class="btn sm" href="'+urlf(k)+'" onclick="event.stopPropagation()">open</a>':'')+'</button>'
          +'<div class="drill-body"></div></div>';
      }).join('');
      el.querySelectorAll('.drill').forEach(function(dr){
        dr.querySelector('button').onclick=function(e){
          if(e.target.tagName==='A') return;
          var open=dr.classList.toggle('open');
          dr.querySelector('.arrow').textContent=open?'▾':'▸';
          if(open) fillDrill(dr, groups[dr.dataset.k], tab);
        };
      });
    }
    function fillDrill(dr, items, tab){
      var done=store();
      dr.querySelector('.drill-body').innerHTML=items.map(function(l){
        var chk=done[l.k]?'checked':'';
        var sub=(tab==='subject'?'Week '+l.w+' · ':'')+(tab!=='subject'?l.s+' · ':'')+l.d;
        return '<label class="'+(chk?'dn':'')+'"><input type="checkbox" data-k="'+l.k+'" '+chk+'> <span class="sub">'+sub+'</span> '+l.t
          +' <a class="sub" href="weeks/week-'+pad(l.w)+'.html">↗</a></label>';
      }).join('');
      dr.querySelectorAll('input[type=checkbox]').forEach(function(cb){
        cb.onchange=function(){
          var s=store();
          if(cb.checked) s[cb.dataset.k]=1; else delete s[cb.dataset.k];
          save(s);
          cb.parentElement.classList.toggle('dn', cb.checked);
          // refresh bars without collapsing
          var openKeys=[].map.call(document.querySelectorAll('.drill.open'),function(d){return d.dataset.k;});
          render();
          openKeys.forEach(function(k){
            document.querySelectorAll('.drill[data-k="'+k+'"]').forEach(function(d){
              d.classList.add('open'); d.querySelector('.arrow').textContent='▾';
              var tab=d.parentElement.id.replace('tab-','');
              var done2=store(), off=offset();
              var items2=window.LESSONS.filter(function(l){ if(off.indexOf(l.s)>=0) return false;
                return String(tab==='week'?l.w:tab==='subject'?l.s:l.u)===String(k); });
              fillDrill(d, items2, tab);
            });
          });
        };
      });
    }
  }
})();
