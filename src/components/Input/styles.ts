import { makeStyles, fade } from "@material-ui/core/styles";

export const useInputCardStyle = makeStyles((theme) => ({
    card: {
        width: "280px",
        margin: theme.spacing(0, 1, 1, 1),
        paddingBottom: theme.spacing(4),
    },
    input: {
        margin: theme.spacing(1),
    },
    btnConfirm: {
        background: "#5AAC44",
        color: "#fff",
        "&:hover": {
            background: fade("#5AAC44", 0.75),
        },
    },
    btnCancel: {
        background: "red",
        color: "#fff",
        marginLeft:'5px'
    },
    confirm: {
        margin: theme.spacing(0, 1, 1, 1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const useInputContainerStyle = makeStyles((theme) => ({
    root: {
        width: "300px",
        marginTop: theme.spacing(1),
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: "#EBECF0",
        "&:hover": {
            backgroundColor: fade("#000", 0.25),
        },
    },
}));
