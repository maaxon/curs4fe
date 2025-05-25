export interface PortalProps{
  id: string;
  children: React.ReactNode;
}

export interface ContainerOptions{
  id: string;
  mountNode?: HTMLElement;
}
