import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  );
}

