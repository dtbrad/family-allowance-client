export default function formatCurrency(num?: number) {
    if (!num) {
        return;
    }

    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
