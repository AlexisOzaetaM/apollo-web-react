export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const isEmpty = (object) => {
    for(var key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const isUserDuplicated = (sourceArray, item) => {
    let result = false;
    sourceArray.forEach(element => {
        if(element.value === item.value)
            result = true;
    });
    return result;
};