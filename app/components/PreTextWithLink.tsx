import { HyperlinkProps } from './Hyperlink';
import { Hyperlink } from '../components';

type HyperlinkWrapperProps = {
  preText: string;
} & HyperlinkProps;

export default function PreTextWithLink({ preText, to, text, title }: HyperlinkWrapperProps) {
  return (
    <p className="mt-4 text-center text-sm font-medium text-text-color-muted-extra">
      {preText} <Hyperlink to={to} text={text} title={title} />
    </p>
  );
}
