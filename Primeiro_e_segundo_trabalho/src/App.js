import { BrowserRouter, Route, Switch } from 'react-router-dom';
import T1 from './pages/T1';
import T2Primeira from './pages/T2Primeira';
import T2Segunda from './pages/T2Segunda';

export default function App(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={T1}/>
                <Route path="/Trabalho2/primeira" component={T2Primeira}/>
                <Route path="/Trabalho2/segunda" component={T2Segunda}/>
            </Switch>
        </BrowserRouter>
      );
}