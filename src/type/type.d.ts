type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};
type ActiveLinkProps ={
    url: string,
    children: React.ReactNode,
}
type TCreateUserParam ={
  cleckId:string,
  userName:string,
  email_address:string,
  name?:string,
  avatar?:string,
}
export { TMenuItem ,ActiveLinkProps,TCreateUserParam};
