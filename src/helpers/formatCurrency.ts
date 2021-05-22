export default function formatCurrency(num: number) {
    return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    });
}
