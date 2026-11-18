/**
 * Renders `text` with only the first `count` characters visible. The rest stays
 * in the layout (invisible), so the page doesn't jump around while typing.
 */
export default function TypedText({ text, count, caret }: { text: string; count: number; caret: boolean }) {
  return (
    <>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {caret && <span className="caret" />}
        <span className="untyped">{text.slice(count)}</span>
      </span>
      <span className="sr-only">{text}</span>
    </>
  )
}
