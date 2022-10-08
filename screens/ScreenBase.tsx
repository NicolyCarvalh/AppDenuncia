import * as React from 'react';


interface Props {
  navigation: any
}

class ScreenBase extends React.Component<Props>{

    constructor(props: any) {
        super(props);
    }

    resetScreen(){
        this.props.navigation.reset({ // reseta os campos de todas as janelas do path Root
            index: 0,
            routes: [{ name: 'Root' }]
        })
    }
    

    render(): React.ReactNode {
        return (
            <>
            </>
        );
    }
    
}

export default ScreenBase;