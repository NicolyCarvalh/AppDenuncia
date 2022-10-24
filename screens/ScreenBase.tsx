import * as React from 'react';

import { StackActions } from '@react-navigation/native';

interface Props {
  navigation: any
}

class ScreenBase extends React.Component<Props>{

    constructor(props: any) {
        super(props);
    }

    resetScreen(){
       // this.props.navigation.dispatch(
        //    StackActions.pop()
        //  );
    }
    

    render(): React.ReactNode {
        return (
            <>
            </>
        );
    }
    
}

export default ScreenBase;