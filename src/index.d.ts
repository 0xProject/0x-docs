declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
  
  declare module '@theme/*';
  
  declare module '@components/*';
  
  declare module '@docusaurus/*';

  declare namespace JSX {
    interface IntrinsicElements {
      'docs-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  declare namespace JSX {
    interface IntrinsicElements {
      'docs-cards': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }


  declare namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }