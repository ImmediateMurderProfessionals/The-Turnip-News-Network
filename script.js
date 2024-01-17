function makeHeadDivs(l,e){
  let c = Array.from(e.childNodes)
  let h = Array.from(e.getElementsByTagName("h"+String(l)));
  let s = [];
  h.forEach(function(ch,i){
    let li = c.indexOf(ch);
    let hi;
    if(i==h.length-1){
      hi = -1;
    }else{
      hi = c.indexOf(h[i+1]);
    }
    if(hi<0){
      s.push(c.slice(li));
    }else{
      s.push(c.slice(li,hi))
    }
  });
  s.forEach(function(hs){
    let ne = document.createElement("div");
    ne.className = "h"+String(l);
    ne.append(...hs);
    e.append(ne);
    makeHeadDivs(l+1,ne);
  });
}

function getTocTree(l,e){
  let c = [];
  let h = Array.from(e.getElementsByClassName("h"+String(l)));
  h.forEach(function(ch,i){
    c[i] = {
      0: ch.children[0],
      1: getTocTree(l+1,ch)
    };
  });
  return c;
}

function makeIDs(t,p){
  t.forEach(function(hs,i){
    hs[0].id = "h"+p+String(i+1);
    makeIDs(hs[1],p+String(i+1)+".");
  });
}

function makeToc(t,e){
  let ul = document.createElement("ul");
  ul.className = "tocUl"
  t.forEach(function(hs){
    h = hs[0];
    li = document.createElement("li");
    a = document.createElement("a");
    a.href = "#"+h.id;
    a.innerHTML = h.textContent;
    li.append(h.id.slice(1)," ",a);
    ul.append(li);
  })
  if (ul.children.length>0) e.append(ul);
  t.forEach(function(hs,i){
    makeToc(hs[1],ul.children[i])
  })
}
