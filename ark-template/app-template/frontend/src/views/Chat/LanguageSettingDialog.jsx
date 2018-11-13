import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const languages = [
    { code: 'en', label: 'English(United States)' },
    { code: 'ko', label: '한국어' },
    { code: 'zh-CN', label: '普通话(中国大陆)' },
    { code: 'ja', label: '日本語' },
    //    {code: 'vi-VN', label: 'Tiếng Việt(Việt Nam)'},
];

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class LanguageSettingDialog extends React.Component {
    constructor(props) {
        super();
        this.state = {
            source: props.source,
            target: props.target,
        };
    }

    handleCancel = () => {
        this.props.onClose(this.props.source, this.props.target);
    };

    handleOk = () => {
        this.props.onClose(this.state.source, this.state.target);
    };

    handleSourceChange = (e) => {
        this.setState({ source: e.target.value });
    };

    handleTargetChange = (e) => {
        this.setState({ target: e.target.value });
    };

    render() {
        const { classes, source, target, ...other } = this.props;

        return (
            <Dialog
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Translation settings</DialogTitle>
                <DialogContent>

                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Your language</FormLabel>
                        <RadioGroup
                            aria-label="Your language"
                            name="sourceLanguage"
                            className={classes.group}
                            value={this.state.source}
                            onChange={this.handleSourceChange}
                        >
                            {languages.map(language => (
                                <FormControlLabel value={language.code} key={language.code} control={<Radio />} label={language.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Translator Bot language</FormLabel>
                        <RadioGroup
                            aria-label="Translation Target language"
                            name="targetLanguage"
                            className={classes.group}
                            value={this.state.target}
                            onChange={this.handleTargetChange}
                        >
                            {languages.map(language => (
                                <FormControlLabel value={language.code} key={language.code} control={<Radio />} label={language.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

LanguageSettingDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    source: PropTypes.string,
    target: PropTypes.string,
};

export default withStyles(styles)(LanguageSettingDialog);
