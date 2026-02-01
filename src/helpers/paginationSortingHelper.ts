type IOption = {
    page?: number | string;
    limit?: number | string;
    sortOrder?: string;
    sortBy?: string;
};

type iOptionResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};

const paginationSortingHelper = (options: IOption): iOptionResult => {
    // Set defaults for page and limit
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 10;
    const skip = (page - 1) * limit;

    const result: iOptionResult = {
        page,
        limit,
        skip,
        sortBy: options.sortBy || "createdAt",
        sortOrder: options.sortOrder || "desc",
    };

    return result;
};

export default paginationSortingHelper;