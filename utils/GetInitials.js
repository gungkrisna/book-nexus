export const GetInitials = ({name}) => {
    const words = name.split(' ');
    let initials = '';

    for (let i = 0; i < words.length; i++) {
        if (i === 2) {
            break;
        }
        initials += words[i][0];
    }

    return initials.toUpperCase();

}