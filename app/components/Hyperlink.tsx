type HyperlinkProps = {
  fieldAttributes: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  children: React.ReactNode;
};

export default function Hyperlink({ fieldAttributes, children }: HyperlinkProps) {
  return (
    <a {...fieldAttributes} className="hyperlink">
      {children}
    </a>
  );
}
