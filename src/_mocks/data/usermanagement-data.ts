export const getLegalEntityList = [
    {
        "id": "48",
        "carrierId": "27487",
        "name": "ABC LIMITED",
        "customerCode": "22892"
    },
    {
        "id": "49",
        "carrierId": "27488",
        "name": "XYZ LIMITED",
        "customerCode": "22893"
    }
];



export const getUsersList = (data: any) => ({
    "usersMetadata": {
        "all": 37,
        "inactive": 0,
        "invited": 0,
        "active": 37
    },
    "users": data
})