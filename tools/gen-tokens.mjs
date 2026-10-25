/**
 * Generates lib/client.js from tools/token-source.json plus the Night Owl palette.
 *
 * token-source.json is a snapshot of DSH's own light/dark alias values
 * (extracted from @deepseek-ai/dsh-client-ui-theme's design-platform.css).
 * We keep the light value verbatim so the light palette is untouched, and
 * replace only the dark value with the Night Owl counterpart.
 *
 * Run: node tools/gen-tokens.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const { aliases, specifics } = JSON.parse(readFileSync(join(here, 'token-source.json'), 'utf8'))

// Night Owl (Sarah Drasner) core palette.
const N = {
  bg: '#011627',
  bgDeep: '#01111d',
  layer1: '#0b2942',
  layer2: '#0e3350',
  layer3: '#123a5c',
  layer4: '#17506f',
  fg: '#d6deeb',
  fgDim: '#a3b5c9',
  fgMuted: '#7f97ab',
  comment: '#637777', // Night Owl original — shiki comments only (3.9:1)
  commentText: '#7d9494', // lifted for UI captions so 11px text stays legible (5.2:1)
  line: '#82aaff',
  purple: '#c792ea',
  cyan: '#7fdbca',
  green: '#addb67',
  orange: '#f78c6c',
  yellow: '#ecc48d',
  red: '#ef5350',
}

/** dark value per alias token suffix */
const ALIAS = {
  'bg-base': N.bg,
  'bg-document-preview': N.bg,
  'bg-document-selection': 'rgba(130,170,255,0.28)',
  'label-document-preview': N.fgDim,
  'bg-layer-1': N.layer1,
  'bg-layer-2': N.layer2,
  'bg-layer-3': N.layer3,
  'bg-mask-1': 'rgba(1,10,18,0.55)',
  'bg-mask-2': 'rgba(1,10,18,0.22)',
  'bg-mask-3': 'rgba(1,10,18,0.50)',
  'bg-mask-photo': 'rgba(1,10,18,0.88)',
  'bg-mask-drop': 'rgba(11,41,66,0.70)',
  'bg-module-platform': N.layer2,
  'bg-multi-select': N.layer3,
  'bg-overlay': N.layer2,
  'bg-skeleton': 'rgba(214,222,235,0.07)',
  'border-inverted': 'rgba(214,222,235,0.07)',
  'border-inverted2': 'rgba(214,222,235,0.09)',
  'border-l1': 'rgba(214,222,235,0.07)',
  'border-l2': 'rgba(214,222,235,0.11)',
  'border-l2-darkmode-thin': 'rgba(214,222,235,0.08)',
  'border-l3': 'rgba(214,222,235,0.16)',
  'border-l4': 'rgba(214,222,235,0.24)',
  'brand-primary': N.line,
  'brand-primary-invert': N.bg,
  'brand-text': N.fg,
  'brand-primary-new-colorprimary-new-color': N.cyan,
  'button-contrast-fill': N.fg,
  'button-elevated-fill': N.layer2,
  'button-floating-fill': N.layer1,
  'button-floating-hover': N.layer3,
  'button-ghost-active-border': '#2f6d92',
  'button-ghost-active-fill': '#12395a',
  'button-ghost-active-hover': N.layer4,
  'button-info-fill': N.line,
  'button-info-hover': '#9dbdff',
  'button-primary-dimmed': '#12395a',
  'button-primary-fill': N.line,
  'button-primary-hover': '#9dbdff',
  'button-tool-bar-fill-invisible': 'rgba(11,41,66,0.35)',
  'button-tool-bar-fill': 'rgba(11,41,66,0.60)',
  'button-tool-bar-hover': 'rgba(18,58,92,0.75)',
  'interactive-bg-active': 'rgba(130,170,255,0.16)',
  'interactive-bg-hover': 'rgba(130,170,255,0.09)',
  'interactive-bg-hover-accent': 'rgba(199,146,234,0.16)',
  'interactive-bg-hover-danger': 'rgba(239,83,80,0.14)',
  'interactive-bg-hover-solid': N.layer3,
  'label-caption': N.commentText,
  'label-deep-diving': N.line,
  'label-deep-diving-shimmer': N.cyan,
  'label-dimmed': '#4b6479',
  'label-primary': N.fg,
  'label-primary-bluish': N.fg,
  'label-primary-dimmed': '#c3cfe0',
  'label-primary-foreground': N.bg,
  'label-primary-inverted': N.bg,
  'label-secondary': N.fgDim,
  'label-shimmer': 'rgba(214,222,235,0.45)',
  'label-tertiary': N.fgMuted,
  'menu-icon': '#c3cfe0',
  'link': N.line,
  'markdown-citation': N.layer1,
  'markdown-code-block': N.layer1,
  'markdown-code-block-banner': N.layer2,
  'markdown-code-segment-selected': N.layer3,
  'markdown-code-segment-unselected': '#08243a',
  'markdown-inline-code': N.layer1,
  'markdown-placeholder': N.layer1,
  'markdown-tag': N.layer1,
  'scrollbar-bg-l1': 'rgba(214,222,235,0.14)',
  'scrollbar-bg-l2': 'rgba(214,222,235,0.20)',
  'scrollbar-hover-l1': 'rgba(214,222,235,0.24)',
  'scrollbar-hover-l2': 'rgba(214,222,235,0.30)',
  'state-business-primary': N.line,
  'state-business-tertiary': '#1d3b53',
  'state-error-primary': N.red,
  'state-error-secondary': N.red,
  'state-idle-primary': '#4b6479',
  'state-success-primary': N.green,
  'state-success-secondary': N.green,
  'state-success-tertiary': '#14301d',
  'state-warn-label': N.yellow,
  'state-warn-primary': N.yellow,
  'state-warn-secondary': N.yellow,
  'state-warn-tertiary': '#33280f',
  'code-diff-added': 'rgba(173,219,103,0.12)',
  'code-diff-deleted': 'rgba(239,83,80,0.12)',
  'file-diff-added-bg': '#0f2a1c',
  'file-diff-added-gutter': '#0a1f14',
  'file-diff-added-marker': N.green,
  'file-diff-deleted-bg': '#33191c',
  'file-diff-deleted-gutter': '#241114',
  'file-diff-deleted-marker': N.red,
  'switch-thumb': N.cyan,
  'toast-bg': N.layer2,
  'toast-label': N.fg,
  'tooltip-bg': N.layer2,
  'tooltip-key-bg': N.layer4,
  'turn-trigger-bg': 'rgba(130,170,255,0.09)',
  'turn-trigger-bg-hover': 'rgba(130,170,255,0.16)',
  'menu-group-header-fill': 'rgba(11,41,66,0.94)',
}

/** dark value per --dsw-specific-* token suffix */
const SPECIFIC = {
  bubble: N.layer1,
  'bubble-highlight': N.layer3,
  'input-major': N.layer1,
  'login-input': '#08243a',
  menu: 'rgba(14,51,80,0.94)',
  selector: N.layer2,
  'sidebar-fill': N.bgDeep,
  'sidebar-nav-item-active': N.layer3,
  'sidebar-nav-item-active-accent': N.line,
  'sidebar-nav-item-hover': N.layer1,
  tip: N.layer2,
}

/** tokens defined outside design-platform.css; explicit light/dark pairs */
const EXTRA = {
  '--dsw-alias-onboarding-accent': { light: '#3964fe', dark: N.purple },
  '--dsw-alias-onboarding-card-fill': {
    light: 'color-mix(in srgb, var(--dsw-static-neutral-bluish-00) 80%, transparent)',
    dark: 'rgba(11,41,66,0.80)',
  },
  '--dsw-alias-onboarding-secondary-fill': { light: 'var(--dsw-static-neutral-bluish-00)', dark: N.layer1 },
  '--dsw-alias-onboarding-checkbox-border': {
    light: 'color-mix(in srgb, var(--dsw-static-neutral-bluish-1000) 20%, transparent)',
    dark: 'rgba(214,222,235,0.20)',
  },
}

/** Shiki syntax tokens (body-level override wins over the :root defaults) */
const SHIKI = {
  '--shiki-token-constant': { light: '#1c7ed6', dark: N.line },
  '--shiki-token-string': { light: '#2f9e44', dark: N.yellow },
  '--shiki-token-string-expression': { light: '#2b8a3e', dark: N.green },
  '--shiki-token-comment': { light: '#868e96', dark: N.comment },
  '--shiki-token-keyword': { light: '#d6336c', dark: N.purple },
  '--shiki-token-parameter': { light: '#e8590c', dark: N.orange },
  '--shiki-token-function': { light: '#6741d9', dark: N.line },
  '--shiki-token-punctuation': { light: '#495057', dark: '#8badc1' },
  '--shiki-token-link': { light: '#1971c2', dark: N.cyan },
  '--shiki-foreground': { light: 'var(--dsw-alias-label-primary)', dark: N.fg },
  '--shiki-background': { light: 'var(--dsw-alias-markdown-code-block)', dark: N.layer1 },
}

const tokens = {}
const missing = []

for (const [suffix, dark] of Object.entries(ALIAS)) {
  const name = `--dsw-alias-${suffix}`
  const entry = aliases[name]
  if (!entry || !entry.light) {
    missing.push(name)
    continue
  }
  tokens[name] = { light: entry.light, dark }
}

for (const [suffix, dark] of Object.entries(SPECIFIC)) {
  const name = `--dsw-specific-${suffix}`
  const entry = specifics[name]
  if (!entry || !entry.light) {
    missing.push(name)
    continue
  }
  tokens[name] = { light: entry.light, dark }
}

Object.assign(tokens, EXTRA, SHIKI)

if (missing.length > 0) {
  console.error('missing light definitions for:', missing.join(', '))
}

const body = Object.entries(tokens)
  .map(([name, pair]) => `  ${JSON.stringify(name)}: { light: ${JSON.stringify(pair.light)}, dark: ${JSON.stringify(pair.dark)} },`)
  .join('\n')

const out = `/**
 * Night Owl theme layer for the DSH Web client.
 *
 * Registers a token override layer on top of the active built-in theme: the
 * light palette keeps its original values, the dark palette is repainted with
 * Night Owl. Because it is an override layer (not a registered theme id), it
 * composes with the user's light/dark/system preference and disappears the
 * moment the plugin is unloaded.
 *
 * Written as a lazy-CJS entry for the DSH Client module table
 * (window.__ModuleLoader__), which is how the Web page loads plugin clients.
 *
 * Generated by tools/gen-tokens.mjs — edit that file, not this one.
 */
window.__ModuleLoader__.load({
  id: 'dsh-plugin-night-owl',
  factory() {
    const SOURCE = 'dsh-plugin-night-owl'
    /** The document canvas is painted before plugins load; repaint it with the palette. */
    const STYLE = 'body[data-ds-dark-theme]{background-color:#011627}'
    const TOKENS = {
${body}
    }

    return {
      inject: ['theme'],
      apply(ctx) {
        ctx.effect(() => {
          const disposeTokens = ctx.theme.overrideTokens(SOURCE, TOKENS)
          const style = document.createElement('style')
          style.dataset.dshNightOwl = ''
          style.textContent = STYLE
          document.head.append(style)
          return () => {
            disposeTokens()
            style.remove()
          }
        }, 'night-owl: dark palette layer')
      },
    }
  },
})
`

writeFileSync(join(root, 'lib', 'client.js'), out)
console.log(`wrote lib/client.js with ${Object.keys(tokens).length} tokens`)
