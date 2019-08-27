import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './containers/Auth/Auth.jsx';
import Layout from './hoc/Layout/Layout.jsx';
import Quiz from './containers/Quiz/Quiz.jsx';
import QuizList from './containers/QuizList/QuizList.jsx';
import QuizCreator from './containers/QuizCreator/QuizCreator.jsx';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/quiz-creator" component={QuizCreator}/>
        <Route path="/quiz/:id" component={Quiz}/>
        <Route path="/" component={QuizList}/>
      </Switch>
    </Layout>
  );
}

export default App;
