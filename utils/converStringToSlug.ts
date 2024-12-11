import slugify from 'slugify'

const converStringToSlug = (data: string) => {
    const str = slugify(data, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        lower: true,      // convert to lower case, defaults to `false`
        locale: 'vi',      // language code of the locale to use
    })
    return str;
}

const getIdBySlug = (data: string) => {
    if (!data) return;
    const parts = data.replace('.html', '').split('-');
    const id = parts[parts.length - 1];
    return id;
}

export { converStringToSlug, getIdBySlug };

