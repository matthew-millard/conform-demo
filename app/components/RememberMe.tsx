import { Checkbox, Label } from './index';

export default function RememberMe() {
  return (
    <div className="flex items-center">
      <Checkbox fieldAttributes={{ id: 'remember-me', name: 'rememberMe' }} defaultChecked={true} />
      <Label htmlFor="remember-me" text="Remember me" classes="ml-3" />
    </div>
  );
}
