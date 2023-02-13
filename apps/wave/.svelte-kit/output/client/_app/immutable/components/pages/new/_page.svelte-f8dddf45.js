import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, n as attr, b as insert_hydration, J as append_hydration, a7 as set_input_value, K as listen, u as set_data, Z as add_render_callback, O as noop, L as run_all, M as component_subscribe, _ as create_in_transition, a8 as set_store_value } from "../../../chunks/index-a8d98783.js";
import { c as commonjsGlobal } from "../../../chunks/_commonjsHelpers-5e0a36df.js";
import { a as fade } from "../../../chunks/index-ae66feaa.js";
import { p as post } from "../../../chunks/currentUser-50513477.js";
import { g as goto } from "../../../chunks/navigation-1c3c4c2b.js";
import { a as allProjectsStore } from "../../../chunks/allProjects-2a86290f.js";
var slugExports = {};
var slug = {
  get exports() {
    return slugExports;
  },
  set exports(v) {
    slugExports = v;
  }
};
(function(module) {
  (function(root) {
    let base64;
    function getWholeCharAndI(str, i) {
      const code = str.charCodeAt(i);
      if (isNaN(code)) {
        throw new RangeError("Index " + i + ' out of range for string "' + str + '"; please open an issue at https://github.com/Trott/slug/issues/new');
      }
      if (code < 55296 || code > 57343) {
        return [str.charAt(i), i];
      }
      if (code >= 55296 && code <= 56319) {
        if (str.length <= i + 1) {
          return [" ", i];
        }
        const next = str.charCodeAt(i + 1);
        if (next < 56320 || next > 57343) {
          return [" ", i];
        }
        return [str.charAt(i) + str.charAt(i + 1), i + 1];
      }
      if (i === 0) {
        return [" ", i];
      }
      const prev = str.charCodeAt(i - 1);
      if (prev < 55296 || prev > 56319) {
        return [" ", i];
      }
      throw new Error('String "' + str + '" reaches code believed to be unreachable; please open an issue at https://github.com/Trott/slug/issues/new');
    }
    if (typeof window !== "undefined") {
      if (window.btoa) {
        base64 = function(input) {
          return btoa(unescape(encodeURIComponent(input)));
        };
      } else {
        base64 = function(input) {
          const str = unescape(encodeURIComponent(input + ""));
          let output = "";
          for (let block, charCode, idx = 0, map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; str.charAt(idx | 0) || (map = "=", idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
            charCode = str.charCodeAt(idx += 3 / 4);
            if (charCode > 255) {
              throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            block = block << 8 | charCode;
          }
          return output;
        };
      }
    } else {
      base64 = function(input) {
        return Buffer.from(input).toString("base64");
      };
    }
    function slug2(string, opts) {
      let result = slugify(string, opts);
      const fallback = opts && opts.fallback !== void 0 ? opts.fallback : slug2.defaults.fallback;
      if (fallback === true && result === "") {
        let input = "";
        for (let i = 0; i < string.length; i++) {
          const charAndI = getWholeCharAndI(string, i);
          i = charAndI[1];
          input += charAndI[0];
        }
        result = slugify(base64(input), opts);
      }
      return result;
    }
    const locales = {
      // http://www.eki.ee/wgrs/rom1_bg.pdf
      bg: { Й: "Y", й: "y", X: "H", x: "h", Ц: "Ts", ц: "ts", Щ: "Sht", щ: "sht", Ъ: "A", ъ: "a", Ь: "Y", ь: "y" },
      // Need a reference URL for German, although this is pretty well-known.
      de: { Ä: "AE", ä: "ae", Ö: "OE", ö: "oe", Ü: "UE", ü: "ue" },
      // Need a reference URL for Serbian.
      sr: { đ: "dj", Đ: "DJ" },
      // https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/864314/ROMANIZATION_OF_UKRAINIAN.pdf
      uk: { И: "Y", и: "y", Й: "Y", й: "y", Ц: "Ts", ц: "ts", Х: "Kh", х: "kh", Щ: "Shch", щ: "shch", Г: "H", г: "h" }
    };
    let defaultLocale = {};
    function slugify(string, opts) {
      if (typeof string !== "string") {
        throw new Error("slug() requires a string argument, received " + typeof string);
      }
      if (typeof opts === "string") {
        opts = { replacement: opts };
      }
      opts = opts ? Object.assign({}, opts) : {};
      opts.mode = opts.mode || slug2.defaults.mode;
      const defaults = slug2.defaults.modes[opts.mode];
      const keys = ["replacement", "multicharmap", "charmap", "remove", "lower", "trim"];
      for (let key, i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        opts[key] = key in opts ? opts[key] : defaults[key];
      }
      const localeMap = locales[opts.locale] || defaultLocale;
      let lengths = [];
      for (const key in opts.multicharmap) {
        if (!Object.prototype.hasOwnProperty.call(opts.multicharmap, key)) {
          continue;
        }
        const len = key.length;
        if (lengths.indexOf(len) === -1) {
          lengths.push(len);
        }
      }
      lengths = lengths.sort(function(a, b) {
        return b - a;
      });
      const disallowedChars = opts.mode === "rfc3986" ? /[^\w\s\-.~]/ : /[^A-Za-z0-9\s]/;
      let result = "";
      for (let char, i = 0, l = string.length; i < l; i++) {
        char = string[i];
        let matchedMultichar = false;
        for (let j = 0; j < lengths.length; j++) {
          const len = lengths[j];
          const str = string.substr(i, len);
          if (opts.multicharmap[str]) {
            i += len - 1;
            char = opts.multicharmap[str];
            matchedMultichar = true;
            break;
          }
        }
        if (!matchedMultichar) {
          if (localeMap[char]) {
            char = localeMap[char];
          } else if (opts.charmap[char]) {
            char = opts.charmap[char].replace(opts.replacement, " ");
          } else if (char.includes(opts.replacement)) {
            char = char.replace(opts.replacement, " ");
          } else {
            char = char.replace(disallowedChars, "");
          }
        }
        result += char;
      }
      if (opts.remove) {
        result = result.replace(opts.remove, "");
      }
      if (opts.trim) {
        result = result.trim();
      }
      result = result.replace(/\s+/g, opts.replacement);
      if (opts.lower) {
        result = result.toLowerCase();
      }
      return result;
    }
    const initialMulticharmap = {
      // multibyte devanagari characters (hindi, sanskrit, etc.)
      फ़: "Fi",
      ग़: "Ghi",
      ख़: "Khi",
      क़: "Qi",
      ड़: "ugDha",
      ढ़: "ugDhha",
      य़: "Yi",
      ज़: "Za",
      // hebrew
      // Refs: http://www.eki.ee/wgrs/rom1_he.pdf
      // Refs: https://en.wikipedia.org/wiki/Niqqud
      בִי: "i",
      בֵ: "e",
      בֵי: "e",
      בֶ: "e",
      בַ: "a",
      בָ: "a",
      בֹ: "o",
      וֹ: "o",
      בֻ: "u",
      וּ: "u",
      בּ: "b",
      כּ: "k",
      ךּ: "k",
      פּ: "p",
      שׁ: "sh",
      שׂ: "s",
      בְ: "e",
      חֱ: "e",
      חֲ: "a",
      חֳ: "o",
      בִ: "i"
    };
    const initialCharmap = {
      // latin
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      Æ: "AE",
      Ç: "C",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      Ð: "D",
      Ñ: "N",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ő: "O",
      Ø: "O",
      Ō: "O",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      Ű: "U",
      Ý: "Y",
      Þ: "TH",
      ß: "ss",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      æ: "ae",
      ç: "c",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      ð: "d",
      ñ: "n",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ő: "o",
      ø: "o",
      ō: "o",
      Œ: "OE",
      œ: "oe",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      ű: "u",
      ý: "y",
      þ: "th",
      ÿ: "y",
      "ẞ": "SS",
      // greek
      α: "a",
      β: "b",
      γ: "g",
      δ: "d",
      ε: "e",
      ζ: "z",
      η: "h",
      θ: "th",
      ι: "i",
      κ: "k",
      λ: "l",
      μ: "m",
      ν: "n",
      ξ: "3",
      ο: "o",
      π: "p",
      ρ: "r",
      σ: "s",
      τ: "t",
      υ: "y",
      φ: "f",
      χ: "x",
      ψ: "ps",
      ω: "w",
      ά: "a",
      έ: "e",
      ί: "i",
      ό: "o",
      ύ: "y",
      ή: "h",
      ώ: "w",
      ς: "s",
      ϊ: "i",
      ΰ: "y",
      ϋ: "y",
      ΐ: "i",
      Α: "A",
      Β: "B",
      Γ: "G",
      Δ: "D",
      Ε: "E",
      Ζ: "Z",
      Η: "H",
      Θ: "Th",
      Ι: "I",
      Κ: "K",
      Λ: "L",
      Μ: "M",
      Ν: "N",
      Ξ: "3",
      Ο: "O",
      Π: "P",
      Ρ: "R",
      Σ: "S",
      Τ: "T",
      Υ: "Y",
      Φ: "F",
      Χ: "X",
      Ψ: "PS",
      Ω: "W",
      Ά: "A",
      Έ: "E",
      Ί: "I",
      Ό: "O",
      Ύ: "Y",
      Ή: "H",
      Ώ: "W",
      Ϊ: "I",
      Ϋ: "Y",
      // turkish
      ş: "s",
      Ş: "S",
      ı: "i",
      İ: "I",
      ğ: "g",
      Ğ: "G",
      // russian
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "j",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "c",
      ч: "ch",
      ш: "sh",
      щ: "sh",
      ъ: "u",
      ы: "y",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "J",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "H",
      Ц: "C",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Sh",
      Ъ: "U",
      Ы: "Y",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
      // ukranian
      Є: "Ye",
      І: "I",
      Ї: "Yi",
      Ґ: "G",
      є: "ye",
      і: "i",
      ї: "yi",
      ґ: "g",
      // czech
      č: "c",
      ď: "d",
      ě: "e",
      ň: "n",
      ř: "r",
      š: "s",
      ť: "t",
      ů: "u",
      ž: "z",
      Č: "C",
      Ď: "D",
      Ě: "E",
      Ň: "N",
      Ř: "R",
      Š: "S",
      Ť: "T",
      Ů: "U",
      Ž: "Z",
      // slovak
      ľ: "l",
      ĺ: "l",
      ŕ: "r",
      Ľ: "L",
      Ĺ: "L",
      Ŕ: "R",
      // polish
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ś: "s",
      ź: "z",
      ż: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ś: "S",
      Ź: "Z",
      Ż: "Z",
      // latvian
      ā: "a",
      ē: "e",
      ģ: "g",
      ī: "i",
      ķ: "k",
      ļ: "l",
      ņ: "n",
      ū: "u",
      Ā: "A",
      Ē: "E",
      Ģ: "G",
      Ī: "I",
      Ķ: "K",
      Ļ: "L",
      Ņ: "N",
      Ū: "U",
      // arabic
      أ: "a",
      إ: "i",
      ب: "b",
      ت: "t",
      ث: "th",
      ج: "g",
      ح: "h",
      خ: "kh",
      د: "d",
      ذ: "th",
      ر: "r",
      ز: "z",
      س: "s",
      ش: "sh",
      ص: "s",
      ض: "d",
      ط: "t",
      ظ: "th",
      ع: "aa",
      غ: "gh",
      ف: "f",
      ق: "k",
      ك: "k",
      ل: "l",
      م: "m",
      ن: "n",
      ه: "h",
      و: "o",
      ي: "y",
      ء: "aa",
      ة: "a",
      // farsi
      آ: "a",
      ا: "a",
      پ: "p",
      ژ: "zh",
      گ: "g",
      چ: "ch",
      ک: "k",
      ی: "i",
      // lithuanian
      ė: "e",
      į: "i",
      ų: "u",
      Ė: "E",
      Į: "I",
      Ų: "U",
      // romanian
      ț: "t",
      Ț: "T",
      ţ: "t",
      Ţ: "T",
      ș: "s",
      Ș: "S",
      ă: "a",
      Ă: "A",
      // vietnamese
      Ạ: "A",
      Ả: "A",
      Ầ: "A",
      Ấ: "A",
      Ậ: "A",
      Ẩ: "A",
      Ẫ: "A",
      Ằ: "A",
      Ắ: "A",
      Ặ: "A",
      Ẳ: "A",
      Ẵ: "A",
      Ẹ: "E",
      Ẻ: "E",
      Ẽ: "E",
      Ề: "E",
      Ế: "E",
      Ệ: "E",
      Ể: "E",
      Ễ: "E",
      Ị: "I",
      Ỉ: "I",
      Ĩ: "I",
      Ọ: "O",
      Ỏ: "O",
      Ồ: "O",
      Ố: "O",
      Ộ: "O",
      Ổ: "O",
      Ỗ: "O",
      Ơ: "O",
      Ờ: "O",
      Ớ: "O",
      Ợ: "O",
      Ở: "O",
      Ỡ: "O",
      Ụ: "U",
      Ủ: "U",
      Ũ: "U",
      Ư: "U",
      Ừ: "U",
      Ứ: "U",
      Ự: "U",
      Ử: "U",
      Ữ: "U",
      Ỳ: "Y",
      Ỵ: "Y",
      Ỷ: "Y",
      Ỹ: "Y",
      Đ: "D",
      ạ: "a",
      ả: "a",
      ầ: "a",
      ấ: "a",
      ậ: "a",
      ẩ: "a",
      ẫ: "a",
      ằ: "a",
      ắ: "a",
      ặ: "a",
      ẳ: "a",
      ẵ: "a",
      ẹ: "e",
      ẻ: "e",
      ẽ: "e",
      ề: "e",
      ế: "e",
      ệ: "e",
      ể: "e",
      ễ: "e",
      ị: "i",
      ỉ: "i",
      ĩ: "i",
      ọ: "o",
      ỏ: "o",
      ồ: "o",
      ố: "o",
      ộ: "o",
      ổ: "o",
      ỗ: "o",
      ơ: "o",
      ờ: "o",
      ớ: "o",
      ợ: "o",
      ở: "o",
      ỡ: "o",
      ụ: "u",
      ủ: "u",
      ũ: "u",
      ư: "u",
      ừ: "u",
      ứ: "u",
      ự: "u",
      ử: "u",
      ữ: "u",
      ỳ: "y",
      ỵ: "y",
      ỷ: "y",
      ỹ: "y",
      đ: "d",
      // kazakh
      Ә: "AE",
      ә: "ae",
      Ғ: "GH",
      ғ: "gh",
      Қ: "KH",
      қ: "kh",
      Ң: "NG",
      ң: "ng",
      Ү: "UE",
      ү: "ue",
      Ұ: "U",
      ұ: "u",
      Һ: "H",
      һ: "h",
      Ө: "OE",
      ө: "oe",
      // serbian
      ђ: "dj",
      ј: "j",
      љ: "lj",
      њ: "nj",
      ћ: "c",
      џ: "dz",
      Ђ: "Dj",
      Ј: "j",
      Љ: "Lj",
      Њ: "Nj",
      Ћ: "C",
      Џ: "Dz",
      ǌ: "nj",
      ǉ: "lj",
      ǋ: "NJ",
      ǈ: "LJ",
      // hindi
      अ: "a",
      आ: "aa",
      ए: "e",
      ई: "ii",
      ऍ: "ei",
      ऎ: "ae",
      ऐ: "ai",
      इ: "i",
      ओ: "o",
      ऑ: "oi",
      ऒ: "oii",
      ऊ: "uu",
      औ: "ou",
      उ: "u",
      ब: "B",
      भ: "Bha",
      च: "Ca",
      छ: "Chha",
      ड: "Da",
      ढ: "Dha",
      फ: "Fa",
      ग: "Ga",
      घ: "Gha",
      ग़: "Ghi",
      ह: "Ha",
      ज: "Ja",
      झ: "Jha",
      क: "Ka",
      ख: "Kha",
      ख़: "Khi",
      ल: "L",
      ळ: "Li",
      ऌ: "Li",
      ऴ: "Lii",
      ॡ: "Lii",
      म: "Ma",
      न: "Na",
      ङ: "Na",
      ञ: "Nia",
      ण: "Nae",
      ऩ: "Ni",
      ॐ: "oms",
      प: "Pa",
      क़: "Qi",
      र: "Ra",
      ऋ: "Ri",
      ॠ: "Ri",
      ऱ: "Ri",
      स: "Sa",
      श: "Sha",
      ष: "Shha",
      ट: "Ta",
      त: "Ta",
      ठ: "Tha",
      द: "Tha",
      थ: "Tha",
      ध: "Thha",
      ड़: "ugDha",
      ढ़: "ugDhha",
      व: "Va",
      य: "Ya",
      य़: "Yi",
      ज़: "Za",
      // azerbaijani
      ə: "e",
      Ə: "E",
      // georgian
      ა: "a",
      ბ: "b",
      გ: "g",
      დ: "d",
      ე: "e",
      ვ: "v",
      ზ: "z",
      თ: "t",
      ი: "i",
      კ: "k",
      ლ: "l",
      მ: "m",
      ნ: "n",
      ო: "o",
      პ: "p",
      ჟ: "zh",
      რ: "r",
      ს: "s",
      ტ: "t",
      უ: "u",
      ფ: "p",
      ქ: "k",
      ღ: "gh",
      ყ: "q",
      შ: "sh",
      ჩ: "ch",
      ც: "ts",
      ძ: "dz",
      წ: "ts",
      ჭ: "ch",
      ხ: "kh",
      ჯ: "j",
      ჰ: "h",
      // hebrew
      ב: "v",
      גּ: "g",
      ג: "g",
      ד: "d",
      דּ: "d",
      ה: "h",
      ו: "v",
      ז: "z",
      ח: "h",
      ט: "t",
      י: "y",
      כ: "kh",
      ך: "kh",
      ל: "l",
      מ: "m",
      ם: "m",
      נ: "n",
      ן: "n",
      ס: "s",
      פ: "f",
      ף: "f",
      ץ: "ts",
      צ: "ts",
      ק: "k",
      ר: "r",
      תּ: "t",
      ת: "t"
    };
    slug2.charmap = Object.assign({}, initialCharmap);
    slug2.multicharmap = Object.assign({}, initialMulticharmap);
    slug2.defaults = {
      charmap: slug2.charmap,
      mode: "pretty",
      modes: {
        rfc3986: {
          replacement: "-",
          remove: null,
          lower: true,
          charmap: slug2.charmap,
          multicharmap: slug2.multicharmap,
          trim: true
        },
        pretty: {
          replacement: "-",
          remove: null,
          lower: true,
          charmap: slug2.charmap,
          multicharmap: slug2.multicharmap,
          trim: true
        }
      },
      multicharmap: slug2.multicharmap,
      fallback: true
    };
    slug2.reset = function() {
      slug2.defaults.modes.rfc3986.charmap = slug2.defaults.modes.pretty.charmap = slug2.charmap = slug2.defaults.charmap = Object.assign({}, initialCharmap);
      slug2.defaults.modes.rfc3986.multicharmap = slug2.defaults.modes.pretty.multicharmap = slug2.multicharmap = slug2.defaults.multicharmap = Object.assign({}, initialMulticharmap);
      defaultLocale = "";
    };
    slug2.extend = function(customMap) {
      const keys = Object.keys(customMap);
      const multi = {};
      const single = {};
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].length > 1) {
          multi[keys[i]] = customMap[keys[i]];
        } else {
          single[keys[i]] = customMap[keys[i]];
        }
      }
      Object.assign(slug2.charmap, single);
      Object.assign(slug2.multicharmap, multi);
    };
    slug2.setLocale = function(locale) {
      defaultLocale = locales[locale] || {};
    };
    if (module.exports) {
      module.exports = slug2;
    } else {
      root.slug = slug2;
    }
  })(commonjsGlobal);
})(slug);
function create_fragment(ctx) {
  let div6;
  let h2;
  let t0;
  let t1;
  let h3;
  let t2;
  let t3;
  let div5;
  let div1;
  let label0;
  let t4;
  let t5;
  let div0;
  let t6;
  let input0;
  let div1_intro;
  let t7;
  let div3;
  let label1;
  let t8;
  let t9;
  let div2;
  let t10;
  let t11;
  let input1;
  let div3_intro;
  let t12;
  let div4;
  let button;
  let t13;
  let t14_value = (
    /*project*/
    ctx[0].name + ""
  );
  let t14;
  let button_disabled_value;
  let mounted;
  let dispose;
  return {
    c() {
      div6 = element("div");
      h2 = element("h2");
      t0 = text("Create new project");
      t1 = space();
      h3 = element("h3");
      t2 = text("Add web analytics to your page in seconds");
      t3 = space();
      div5 = element("div");
      div1 = element("div");
      label0 = element("label");
      t4 = text("Name");
      t5 = space();
      div0 = element("div");
      t6 = space();
      input0 = element("input");
      t7 = space();
      div3 = element("div");
      label1 = element("label");
      t8 = text("URL");
      t9 = space();
      div2 = element("div");
      t10 = text("URL of your website.");
      t11 = space();
      input1 = element("input");
      t12 = space();
      div4 = element("div");
      button = element("button");
      t13 = text("Create ");
      t14 = text(t14_value);
      this.h();
    },
    l(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      h2 = claim_element(div6_nodes, "H2", { class: true });
      var h2_nodes = children(h2);
      t0 = claim_text(h2_nodes, "Create new project");
      h2_nodes.forEach(detach);
      t1 = claim_space(div6_nodes);
      h3 = claim_element(div6_nodes, "H3", { class: true });
      var h3_nodes = children(h3);
      t2 = claim_text(h3_nodes, "Add web analytics to your page in seconds");
      h3_nodes.forEach(detach);
      t3 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", {});
      var div5_nodes = children(div5);
      div1 = claim_element(div5_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      label0 = claim_element(div1_nodes, "LABEL", {});
      var label0_nodes = children(label0);
      t4 = claim_text(label0_nodes, "Name");
      label0_nodes.forEach(detach);
      t5 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      t6 = claim_space(div1_nodes);
      input0 = claim_element(div1_nodes, "INPUT", { type: true, placeholder: true });
      div1_nodes.forEach(detach);
      t7 = claim_space(div5_nodes);
      div3 = claim_element(div5_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      label1 = claim_element(div3_nodes, "LABEL", {});
      var label1_nodes = children(label1);
      t8 = claim_text(label1_nodes, "URL");
      label1_nodes.forEach(detach);
      t9 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      t10 = claim_text(div2_nodes, "URL of your website.");
      div2_nodes.forEach(detach);
      t11 = claim_space(div3_nodes);
      input1 = claim_element(div3_nodes, "INPUT", { type: true, placeholder: true });
      div3_nodes.forEach(detach);
      t12 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      button = claim_element(div4_nodes, "BUTTON", {});
      var button_nodes = children(button);
      t13 = claim_text(button_nodes, "Create ");
      t14 = claim_text(button_nodes, t14_value);
      button_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(h2, "class", "mb-2");
      attr(h3, "class", "mb-8");
      attr(div0, "class", "_hint mb-4");
      attr(input0, "type", "text");
      attr(input0, "placeholder", "eg. Momentum, Paralect, MyCatchyBrand etc.");
      attr(div1, "class", "mb-8");
      attr(div2, "class", "_hint mb-4");
      attr(input1, "type", "text");
      attr(input1, "placeholder", "eg. https://paralect.com");
      attr(div3, "class", "mb-8");
      button.disabled = button_disabled_value = !/*project*/
      ctx[0].name || !/*project*/
      ctx[0].url;
      attr(div4, "class", "mt-12");
      attr(div6, "class", "max-w-[600px] mx-auto");
    },
    m(target, anchor) {
      insert_hydration(target, div6, anchor);
      append_hydration(div6, h2);
      append_hydration(h2, t0);
      append_hydration(div6, t1);
      append_hydration(div6, h3);
      append_hydration(h3, t2);
      append_hydration(div6, t3);
      append_hydration(div6, div5);
      append_hydration(div5, div1);
      append_hydration(div1, label0);
      append_hydration(label0, t4);
      append_hydration(div1, t5);
      append_hydration(div1, div0);
      append_hydration(div1, t6);
      append_hydration(div1, input0);
      set_input_value(
        input0,
        /*project*/
        ctx[0].name
      );
      append_hydration(div5, t7);
      append_hydration(div5, div3);
      append_hydration(div3, label1);
      append_hydration(label1, t8);
      append_hydration(div3, t9);
      append_hydration(div3, div2);
      append_hydration(div2, t10);
      append_hydration(div3, t11);
      append_hydration(div3, input1);
      set_input_value(
        input1,
        /*project*/
        ctx[0].url
      );
      append_hydration(div5, t12);
      append_hydration(div5, div4);
      append_hydration(div4, button);
      append_hydration(button, t13);
      append_hydration(button, t14);
      if (!mounted) {
        dispose = [
          listen(
            input0,
            "input",
            /*input0_input_handler*/
            ctx[2]
          ),
          listen(
            input1,
            "input",
            /*input1_input_handler*/
            ctx[3]
          ),
          listen(
            button,
            "click",
            /*addProject*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*project*/
      1 && input0.value !== /*project*/
      ctx2[0].name) {
        set_input_value(
          input0,
          /*project*/
          ctx2[0].name
        );
      }
      if (dirty & /*project*/
      1 && input1.value !== /*project*/
      ctx2[0].url) {
        set_input_value(
          input1,
          /*project*/
          ctx2[0].url
        );
      }
      if (dirty & /*project*/
      1 && t14_value !== (t14_value = /*project*/
      ctx2[0].name + ""))
        set_data(t14, t14_value);
      if (dirty & /*project*/
      1 && button_disabled_value !== (button_disabled_value = !/*project*/
      ctx2[0].name || !/*project*/
      ctx2[0].url)) {
        button.disabled = button_disabled_value;
      }
    },
    i(local) {
      if (!div1_intro) {
        add_render_callback(() => {
          div1_intro = create_in_transition(div1, fade, {});
          div1_intro.start();
        });
      }
      if (!div3_intro) {
        add_render_callback(() => {
          div3_intro = create_in_transition(div3, fade, { duration: 100 });
          div3_intro.start();
        });
      }
    },
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div6);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let $allProjects;
  component_subscribe($$self, allProjectsStore, ($$value) => $$invalidate(4, $allProjects = $$value));
  let project = { name: "", url: "" };
  const addProject = async () => {
    const newProject = await post("waveProjects", project);
    set_store_value(allProjectsStore, $allProjects = [newProject, ...$allProjects], $allProjects);
    goto(`projects/${newProject.slug}`);
  };
  function input0_input_handler() {
    project.name = this.value;
    $$invalidate(0, project);
  }
  function input1_input_handler() {
    project.url = this.value;
    $$invalidate(0, project);
  }
  return [project, addProject, input0_input_handler, input1_input_handler];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
