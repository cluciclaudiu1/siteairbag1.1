class Store
{
    config = {
        lang: "",
        mainpage: false,
        subpage: false,
        mode: {
            contrast: {
                enable: false,
            },
            text: {
                enable: false,
            },
            mobile: {
                enable: false,
            },
        }
    }
    slugs = []
    route = {
        path: "",
    }
    data = {
        service: {
            Ad: {
                enable: false
            },
            Calendar: {
            }
        }
    }
    service = {}
}

const store = new Store()
