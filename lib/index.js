/**
 * Night Owl — Host-side half of the plugin.
 *
 * The palette itself lives in the client entry (`./client`): it registers a
 * token override layer through `ctx.theme`, which only exists in the browser.
 * This Host entry has nothing to do beyond being a valid Cordis plugin, so the
 * bundle patch can mount it and the client composition can pick up the
 * accompanying `dsh.client` entry.
 */
export const name = 'night-owl'

export function apply() {}
