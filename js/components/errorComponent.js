/**
 * Created by abradley on 24/09/2018.
 */
import * as Sentry from '@sentry/browser';
import React from "react";
import {Button} from "react-bootstrap";

export class ErrorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Sentry.configureScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
      });
      Sentry.captureException(error);
    }

    render() {
        if (this.state.error) {
            //render fallback UI
            return (
              <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            );
        } else {
            return <Button bsSize="sm" bsStyle="success" onClick={Sentry.showReportDialog}>Report feedback</Button>;
        }
    }
}