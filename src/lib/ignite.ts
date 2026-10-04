export const IGNITE_EVENT = 'nijat:ignite'

/** Fire a burst somewhere on the hero's fire field from anywhere in the app. */
export function igniteField(count = 6) {
  window.dispatchEvent(new CustomEvent(IGNITE_EVENT, { detail: count }))
}
