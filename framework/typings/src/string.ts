export {}
declare global {
    export interface String {
        toCamelCase: () => string,
        toTitleCase: () => string,
        capitalizeFirst: () => string,
        toKebabCase: () => string,
    }
}


String.prototype.toCamelCase = function (): string {
    return this.replace(/(?:^\w|[A-Z]|-|\b\w)/g,
        (ltr, idx) => idx === 0
            ? ltr.toLowerCase()
            : ltr.toUpperCase()
    ).replace(/\s+|-/g, '');
};

String.prototype.toTitleCase = function (): string {
    return this.replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
};

String.prototype.capitalizeFirst = function (): string {
    return this.replace(/^[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
};

String.prototype.toKebabCase = function (): string {
    return this.replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};