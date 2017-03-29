// Generated by CoffeeScript 2.0.0-alpha1
var Pen, body, doc, head, log, pro;

log = console.log;

doc = document;

pro = function(arg) {
  return arg.prototype;
};

pro(String).getInput = function(reg) {
  var a, str;
  str = this;
  a = void 0;
  while ((a = reg.exec(str)) !== null) {
    if (a.index === reg.lastIndex) {
      reg.lastIndex++;
    }
    return a;
  }
};

if (doc.body != null) {
  body = doc.body;
} else {
  alert("Body is not defined in the html document.");
}

if (doc.head != null) {
  head = doc.head;
} else {
  alert("Head is not defined in the html document.");
}

Pen = class Pen {
  constructor(auto) {
    var style;
    this.auto = auto;
    style = document.createElement('style');
    style.innerHTML = ".console {\n  text-align:center;\n  color:rgb(255,255,255);\n  background-color: rgb(155,155,155);\n  opacity:0.5;\n  border-left:solid 2px blue;\n  border-right:solid 2px blue;\n  padding:5px;\n  bottom: 0;\n  width:50%;\n  z-index:102;\n  position:fixed;\n  font-family:Arial;\n  font-weight:bold;\n  transition:all 0.5s ease; }\n.console:hover {\n  color:rgb(255,255,255);\n  opacity:1;\n  background-color:rgba(55,55,55);\n}";
    head.appendChild(style);
    this.para = this.create('p');
    body.appendChild(this.para);
    return;
  }

  changeOption(op) {
    this.auto = op;
  }

  appendToHead(...el) {
    var i, j, len;
    for (j = 0, len = el.length; j < len; j++) {
      i = el[j];
      head.appendChild(el[i]);
      return;
    }
  }

  appendToBody(...el) {
    var i, j, len;
    for (j = 0, len = el.length; j < len; j++) {
      i = el[j];
      body.appendChild(el[i]);
      return;
    }
  }

  create(el) {
    return doc.createElement(el);
  }

  getIdOf(el) {
    return doc.getElementById(el);
  }

  getNameOf(el) {
    return doc.getElementsByName(el);
  }

  getClassOf(el) {
    return doc.getElementsByClassName(el);
  }

  getTagsOf(el) {
    return doc.getElementsByTagName(el);
  }

  select(txt) {
    return doc.querySelector(txt);
  }

  selectAll(txt) {
    return doc.querySelectorAll(txt);
  }

  checker() {
    if (this.auto === true) {
      return true;
    } else {
      return false;
    }
  }

  autoAppend(el) {
    if (this.checker() === true) {
      body.appendChild(el);
      return el;
    } else {
      return el;
    }
  }

  oEl(el, oel) {
    if (!oel) {
      return el;
    } else {
      if (typeof oel === 'function') {
        return el.appendChild(oel(el));
      } else {
        el.appendChild(oel);
        return el;
      }
    }
  }

  createAppend(el) {
    el = this.create(el);
    return this.autoAppend(el);
  }

  checkElement(el) {
    if (typeof el === 'string') {
      el = this.select(el);
      return el;
    }
  }

  createWithObj(el, obj, txt) {
    el = this.create(el);
    el = this.objHandler(el, obj);
    return el;
  }

  createWithText(el, txt) {
    el = this.create(el);
    el.innerHTML = txt;
    return el;
  }


  /*
   * ^^^^^
   * Helpers
   * -------
   * Handlers
   * vvvvv
   */

  objHandler(el, obj, txt) {
    if (txt != null) {
      el.innerHTML = txt;
    }
    if (obj.title != null) {
      el.setAttribute("title", obj.title);
    }
    if (obj.style != null) {
      el.setAttribute("style", obj.style);
    }
    if ((obj.id != null) || (obj.identification != null)) {
      el.setAttribute("id", obj.id || obj.identification);
    }
    if ((obj.click != null) || (obj.onclick != null)) {
      el.setAttribute("onclick", obj.click || obj.onclick);
    }
    if ((obj["class"] != null) || (obj.classes != null)) {
      el.setAttribute("class", obj["class"] || obj.classes);
    }
    return el;
  }

  areaHandler(el, obj, txt) {
    el = this.objHandler(el, obj, txt);
    el.width = obj.width != null ? obj.click : '';
    el.height = obj.height != null ? obj.height : '';
    return el;
  }

  inputHandler(el, obj, type, txt) {
    el = this.objHandler(el, obj);
    el.value = txt != null ? txt : '';
    el.type = obj.type != null ? obj.type : '';
    return el;
  }

  linkAndSourceHandler(el, obj, txt, type) {
    el = this.objHandler(el, obj, txt);
    if (type.match(/link|href/gi)) {
      el.href = (function() {
        if (obj.href != null) {
          return obj.href;
        } else {
          throw new Error("'href' must be defined in the object parameter");
        }
      })();
    } else if (type.match(/source|src/gi)) {
      el.src = (function() {
        if (obj.src != null) {
          return obj.src;
        } else {
          throw new Error("'src' must be defined in the object parameter");
        }
      })();
    }
    return el;
  }

  dividerHandler(el) {
    return el;
  }

  automaticHandler(el, txt, obj, oel) {
    el = this.create(el);
    el = this.objHandler(el, obj, txt);
    if (oel) {
      el = this.oEl(el, oel);
    }
    return this.autoAppend(el);
  }

  automaticLinkHandler(el, type, txt, obj, oel) {
    el = this.create(el);
    el = this.linkAndSourceHandler(el, obj, txt, type);
    if (oel) {
      el = this.oEl(el, oel);
    }
    return this.autoAppend(el);
  }

  automaticInputHandler(el, type, txt, obj) {
    el = this.create(el);
    el = this.inputHandler(el, obj, type, txt);
    return this.autoAppend(el);
  }

  automaticAreaHandler(el, txt, obj) {
    el = this.create(el);
    el = this.areaHandler(el, obj, txt);
    return this.autoAppend(el);
  }

  automaticDividerHandler(el) {
    el = this.create(el);
    el = this.dividerHandler(el);
    return this.autoAppend(el);
  }


  /*
   * ^^^^^
   * Handlers
   * -------
   * Methods
   * vvvvv
   */

  Html(el, txt) {
    el = this.checkElement(el);
    if (typeof txt === 'object') {
      JSON.parse(txt);
    }
    if (typeof txt === 'function') {
      txt = txt(el);
    }
    el.innerHTML = txt;
    return el;
  }

  Css(el, txt) {
    el = this.checkElement(el);
    el.style = txt;
    return el;
  }

  Id(el, txt) {
    el = this.checkElement(el);
    el.id = txt;
    return el;
  }

  Type(el, txt) {
    el = this.checkElement(el);
    el.type = txt;
    return el;
  }

  Append(el, el2) {
    el = this.checkElement(el);
    el.appendChild(el2);
    return el;
  }


  /*
   * ^^^^^
   * Methods
   * -------
   * Tags
   * vvvvv
   */

  p(txt, obj) {
    return this.automaticHandler('p', txt, obj);
  }

  div(obj, txt, oel) {
    return this.automaticHandler('div', txt, obj, oel);
  }

  span(obj, txt, oel) {
    return this.automaticHandler('span', txt, obj, oel);
  }

  a(obj, txt, oel) {
    return this.automaticLinkHandler('a', "href", txt, obj, oel);
  }

  ul(obj, txt, oel) {
    return this.automaticHandler('ul', txt, obj, oel);
  }

  li(obj, txt, oel) {
    return this.automaticHandler('li', txt, obj, oel);
  }

  code(obj, txt) {
    return this.automaticHandler('code', txt, obj);
  }

  pre(obj, txt) {
    return this.automaticHandler('pre', txt, obj);
  }

  label(obj, txt) {
    return this.automaticHandler('label', txt, obj);
  }

  legend(obj, txt) {
    return this.automaticHandler('legend', txt, obj);
  }

  form(obj, txt, oel) {
    return this.automaticHandler('form', txt, obj, oel);
  }

  fieldset(obj, txt, oel) {
    return this.automaticHandler('fieldset', txt, obj, oel);
  }

  input(obj, type, txt) {
    return this.automaticInputHandler('input', type, txt, obj);
  }

  button(obj, txt) {
    return this.automaticHandler('button', txt, obj);
  }

  abbr(obj, txt) {
    return this.automaticHandler('abbr', txt, obj);
  }

  style(txt, obj) {
    return this.automaticHandler('style', txt, obj);
  }

  script(txt, obj) {
    return this.automaticHandler('script', txt, obj);
  }

  canvas(obj, txt) {
    return this.automaticHandler('canvas', txt, obj);
  }

  h1(txt, obj) {
    return this.automaticHandler('h1', txt, obj);
  }

  h2(txt, obj) {
    return this.automaticHandler('h2', txt, obj);
  }

  h3(txt, obj) {
    return this.automaticHandler('h3', txt, obj);
  }

  h4(txt, obj) {
    return this.automaticHandler('h4', txt, obj);
  }

  h5(txt, obj) {
    return this.automaticHandler('h5', txt, obj);
  }

  h6(txt, obj) {
    return this.automaticHandler('h6', txt, obj);
  }

  br() {
    return this.automaticDividerHandler('br');
  }


  /*
   * ^^^^^
   * Tags
   * -------
   * Methods part 2
   * vvvvv
   */

  write(txt) {
    var cover, link;
    if (txt instanceof Object) {
      txt = JSON.stringify(txt);
    }
    if (txt instanceof Array) {
      txt = txt.join(', ');
    }
    this.para.setAttribute("class", "console");
    txt = txt.replace(/;|`n|\\n/gi, '.<br>');
    if (txt.match(/\((.*?)\)\[(.*?)\]/gi)) {
      link = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[2];
      cover = txt.getInput(/\((.*?)\)\[(.*?)\]/gi)[1];
    }
    txt = txt.replace(/\((.*?)\)\[(.*?)\]/gi, `<a href='${link}' title='${link}'>${cover}</a>`);
    return this.para.innerHTML += txt;
  }

};
