type HyperlinkProps = {
  fieldAttributes: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  children: React.ReactNode;
};

export default function Hyperlink({ fieldAttributes, children }: HyperlinkProps) {
  return (
    <a
      {...fieldAttributes}
      className="font-semibold text-zinc-400 hover:text-zinc-200 text-sm leading-6  focus-visible:outline focus-visible:outline-2 focus:ring-violet-600 focus-visible:outline-violet-600 rounded-sm"
    >
      {children}
    </a>
  );
}
