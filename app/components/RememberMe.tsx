import { Checkbox, Label } from './index';

export default function RememberMe() {
  return (
    <div className="flex items-center">
      <Checkbox fieldAttributes={{ id: 'remember-me', name: 'rememberMe' }} defaultChecked={true} />
      <Label htmlFor="remember-me" text="Remember me" classNames="ml-3 block text-sm leading-6 text-zinc-50" />
    </div>
  );
}
