import { AppStackRoutesParamList } from "../Routes/app.routes"

export declare global {
  namespace ReactNavigation {
    interface RootParamList  extends AppStackRoutesParamList{
      signIn: undefined,
      home: {
        currentUser: string;
      },
    }
  }
}
