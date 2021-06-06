import { makeStyles } from "@material-ui/core/styles";

export const useStyle = makeStyles(() => ({
    container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "lightblue",
        alignItems: "center",
        flexDirection: "column",
    },
    body: {
        display: "flex",
        width: "100vw",
        height: "50vh",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
    },
    input: {
        width: "20vw",
        marginBottom: 10,
        textDecorationLine: "none",
    },
}));
