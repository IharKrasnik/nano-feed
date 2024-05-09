import RenderUrl from 'lib/components/RenderUrl.svelte';

const pick = function (attrs, allowed) {
  if (!attrs) {
    return null
  }
  let h = {}
  for (let key in attrs) {
    let value = attrs[key]
    if (allowed.indexOf(key) > -1 && value !== null) {
      h[key] = value
    }
  }
  return h
}

const isEmailLinkType = type => type === 'email'

export default {
  nodes: {
    horizontalRule(node) {
      return {
        singleTag: 'hr'
      }
    },
    blockquote(node) {
      return {
        tag: 'blockquote'
      }
    },
    bulletList(node) {
      return {
        tag: 'ul'
      }
    },
    codeBlock(node) {
      return {
        tag: [
          'pre',
          {
            tag: 'code',
            attrs: node.attrs
          }
        ]
      }
    },
    hardBreak(node) {
      return {
        singleTag: 'br'
      }
    },
    heading(node) {
      return {
        tag: `h${node.attrs.level}`
      }
    },
    image(node) {
      return {
        singleTag: [{
          tag: 'img',
          attrs: pick(node.attrs, ['src', 'alt', 'title'])
        }]
      }
    },
    listItem(node) {
      return {
        tag: 'li'
      }
    },
    orderedList(node) {
      return {
        tag: 'ol'
      }
    },
    paragraph(node) {
      return {
        tag: 'p'
      }
    },
    social_embed(node) {
      const divEl = document.createElement('div');

      new RenderUrl({ target: divEl, props: { url: node.attrs.src } });

      return {
        html: divEl.innerHTML,
      }
    }
  },
  marks: {
    bold() {
      return {
        tag: 'b'
      }
    },
    strike() {
      return {
        tag: 'strike'
      }
    },
    underline() {
      return {
        tag: 'u'
      }
    },
    strong() {
      return {
        tag: 'strong'
      }
    },
    code() {
      return {
        tag: 'code'
      }
    },
    italic() {
      return {
        tag: 'i'
      }
    },
    link(node) {
      const attrs = { ...node.attrs }
      const { linktype = 'url' } = node.attrs

      if (isEmailLinkType(linktype)) {
        attrs.href = `mailto:${attrs.href}`
      }

      if (attrs.anchor) {
        attrs.href = `${attrs.href}#${attrs.anchor}`
        delete attrs.anchor
      }

      return {
        tag: [{
          tag: 'a',
          attrs: attrs
        }]
      }
    },
    styled(node) {
      return {
        tag: [{
          tag: 'span',
          attrs: node.attrs
        }]
      }
    }
  }
}