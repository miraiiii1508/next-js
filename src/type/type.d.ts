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
  clerkId:string,
  username:string,
  email:string,
  name?:string,
  avatar?:string,
}
export { TMenuItem ,ActiveLinkProps,TCreateUserParam};
