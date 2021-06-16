import { makeStyles } from "@material-ui/core/styles";

export const useListStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#EBECF0",
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            marginRight: theme.spacing(1),
        },
    },
    cardContainer: {
        marginTop: theme.spacing(4),
    },
}));

export const useTitleStyle = makeStyles((theme) => ({
    editableTitleContainer: {
        margin: theme.spacing(1),
        display: "flex",
    },
    editableTitle: {
        flexGrow: 1,
        fontSize: "1.2rem",
        fontWeight: "bold",
    },
}));
