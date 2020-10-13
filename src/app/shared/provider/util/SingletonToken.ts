export class SingletonToken {

    private static instance: SingletonToken;
    token: string;
    crEmpresa: string;
    crUsuario: string;
  
    private constructor() {}
  
    public static getInstance(): SingletonToken {
      if (SingletonToken.instance == null) {
        SingletonToken.instance = new SingletonToken();
      }
      return SingletonToken.instance;
    }
  }
  