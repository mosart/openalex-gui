
const makeFacetQueryFilters = function (facetFilters) {

}

const facetCategories = {
    works: [
        "popular",
        "institution",
        "location",
        "host",
        "access",
        "ids",
        "citation",
        "other",
    ],
    authors: [
        "popular",
        "institution",
        "location",
        "ids",
        "other",
    ],
    venues: [
        "popular",
        "access",
        "other",
    ],
    institutions: [
        "popular",
        "location",
        "other",
    ],
    concepts: [
        "popular",
        "other"
    ],
}

const facetConfigs = function (entityType) {
    const ret = [


        // works:  wavic
        {
            key: "concepts.id",
            entityType: "works",
            displayName: "Concept",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            isCore: true,
            icon: "mdi-lightbulb-outline",
        },
        {
            key: "host_venue.id",
            entityType: "works",
            displayName: "Host",
            isEntity: true,
            entityId: "venues",
            autocompleteEndpoint: "autocomplete/venues",
            valuesToShow: "mostCommon",
            category: "host",
            isCore: true,
            icon: "mdi-book-open-outline",
        },
        {
            key: "authorships.institutions.id",
            entityType: "works",
            displayName: "Institution",
            isEntity: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            valuesToShow: "mostCommon",
            category: "institution",
            isCore: true,
            icon: "mdi-town-hall",
        },
        {
            key: "authorships.author.id",
            entityType: "works",
            displayName: "Author",
            isEntity: true,
            entityId: "authors",
            autocompleteEndpoint: "autocomplete/authors",
            valuesToShow: "mostCommon",
            category: "popular",
            isCore: true,
        icon: "mdi-account-outline",
        },


        // works: host venue
        {
            key: "host_venue.publisher",
            entityType: "works",
            displayName: "Publisher",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "host",
        icon: "mdi-book-open-outline",
        },
        {
            key: "host_venue.type",
            entityType: "works",
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "host",
        icon: "mdi-book-open-outline",
        },


        // works: open access
        {
            key: "open_access.is_oa",
            entityType: "works",
            displayName: "Access",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Toll-access", "Open Access"],
            category: "access",
            isCore: true,
            icon: "mdi-lock-open-outline",
        },
        {
            key: "host_venue.license",
            entityType: "works",
            displayName: "License",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        {
            key: "open_access.oa_status",
            entityType: "works",
            displayName: "Color",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        // {
        //     key: "alternate_host_venues.version",
        //     entityType: "works",
        //     displayName: "Open version",
        //     valuesToShow: "mostCommon",
        //     category: "access",
        //     icon: "mdi-lock-open-outline",
        // },
        // {
        //     key: "has_abstract",
        //     entityType: "works",
        //     displayName: "Has abstract",
        //     valuesToShow: "mostCommon",
        // },


        // works: institutions:
        {
            key: "authorships.institutions.country_code",
            entityType: "works",
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            isCore: true,
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.continent",
            entityType: "works",
            displayName: "Continent",
            valuesToShow: "mostCommon",
            category: "location",
            isCore: true,
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.is_global_south",
            entityType: "works",
            displayName: "Global South",
            category: "location",
            isBoolean: true,
            booleanValues: ["Global North", "Global South"],
            icon: "mdi-map-marker-outline",
            // icon: "mdi-town-hall",
        },
        {
            key: "authorships.institutions.type",
            entityType: "works",
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },


        {
            key: "type",
            entityType: "works",
            displayName: "Type",
            valuesToShow: "mostCommon",
            category: "popular",
        icon: "mdi-file-document-outline",
        },
        {
            key: "publication_year",
            entityType: "works",
            displayName: "Year published",
            valuesToShow: "range",
            sortByValue: true,
            isRange: true,
            category: "other",
            isCore: true,
            sortToTop: true,
            icon: "mdi-calendar-text"
        },
        {
            key: "has_doi",
            entityType: "works",
            displayName: "DOI",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Has no DOI", "Has DOI"],
            category: "ids",
            icon: "mdi-label-outline",
        },
        {
            key: "has_pmid",
            entityType: "works",
            displayName: "PMID",
            valuesToShow: "boolean",
            isBoolean: true,
            category: "ids",
            icon: "mdi-label-outline",
            booleanValues: ["Has no PMID", "Has PMID"],
        },
        {
            key: "has_pmcid",
            entityType: "works",
            displayName: "PMC ID",
            valuesToShow: "boolean",
            isBoolean: true,
            category: "ids",
            icon: "mdi-label-outline",
            booleanValues: ["No PMC ID", "Has PMC ID"],
        },
        {
            key: "is_retracted",
            entityType: "works",
            displayName: "Retracted",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["Isn't retracted", "Is retracted"],
            category: "other",
            icon: "mdi-file-document-outline"
        },

        // works: links to other works
        // {
        //     key: "cited_by_count",
        //     entityType: "works",
        //     displayName: "Citation count",
        //     valuesToShow: "mostCommon",
        //     sortByValue: true,
        //     isRange: true,
        //     category: "citation",
        //     isCore: true,
        // },
        {
            key: "cited_by",
            entityType: "works",
            displayName: "Cited by",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "citation",
            icon: "mdi-format-quote-close",
        },
        {
            key: "cites",
            entityType: "works",
            displayName: "Cites",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "citation",
            icon: "mdi-format-quote-close",
        },
        {
            key: "related_to",
            entityType: "works",
            displayName: "Related to",
            isEntity: true,
            autocompleteEndpoint: "autocomplete/works",
            noOptions: true,
            valuesToShow: "select",
            category: "other",
            isHidden: true,
            icon: "mdi-file-document-multiple-outline",
        },








        // authors
        {
            key: "last_known_institution.id",
            entityType: "authors",
            displayName: "Institution",
            isEntity: true,
            entityId: "institutions",
            autocompleteEndpoint: "autocomplete/institutions",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },
        {
            key: "last_known_institution.country_code",
            entityType: "authors",
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            icon: "mdi-map-marker-outline",
        },
        {
            key: "last_known_institution.type",
            entityType: "authors",
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            valuesToShow: "mostCommon",
            category: "institution",
            icon: "mdi-town-hall",
        },
        {
            key: "has_orcid",
            entityType: "authors",
            displayName: "ORCID",
            valuesToShow: "boolean",
            isBoolean: true,
            booleanValues: ["No ORCID", "Has ORCID"],
            category: "ids",
            icon: "mdi-label-outline",
        },
        {
            key: "x_concepts.id",
            entityType: "authors",
            displayName: "Concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            icon: "mdi-lightbulb-outline",
        },









        // venues
        {
            key: "publisher",
            entityType: "venues",
            displayName: "Publisher",
            autocompleteEndpoint: "autocomplete/venues/publisher",
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-book-open-outline",
        },
        {
            key: "is_oa",
            entityType: "venues",
            displayName: "Open Access",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        {
            key: "is_in_doaj",
            entityType: "venues",
            displayName: "In DOAJ",
            valuesToShow: "mostCommon",
            category: "access",
            icon: "mdi-lock-open-outline",
        },
        {
            key: "x_concepts.id",
            entityType: "venues",
            displayName: "Concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            icon: "mdi-lightbulb-outline",
        },







        // institutions
        {
            key: "country_code",
            entityType: "institutions",
            displayName: "Country",
            autocompleteEndpoint: "autocomplete/institutions/country",
            valuesToShow: "mostCommon",
            isCountry: true,
            category: "location",
            icon: "mdi-map-marker-outline"
        },
        {
            key: "type",
            entityType: "institutions",
            displayName: "Type",
            autocompleteEndpoint: "autocomplete/institutions/type",
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-town-hall"
        },
        {
            key: "x_concepts.id",
            entityType: "institutions",
            displayName: "Concepts",
            isEntity: true,
            entityId: "concepts",
            autocompleteEndpoint: "autocomplete/concepts",
            valuesToShow: "mostCommon",
            category: "other",
            icon: "mdi-lightbulb-outline",
        },







        // concepts
        {
            key: "level",
            entityType: "concepts",
            displayName: "Level",
            maxPotentialFiltersToShow: 10,
            valuesToShow: "mostCommon",
            category: "popular",
            icon: "mdi-lightbulb-outline"
        },
    ]
    return ret
        // .filter(f => onlyReturnTheseFacets.includes(f.key))
        .map(config => {
            return {
                ...config,
                // values: [],
            }
        })
        .filter(config => {
            return !entityType || config.entityType === entityType
        })
}

const getFacetConfig = function (key, attr) {
    const myFacetConfig = facetConfigs().find(f => f.key === key)
    if (!myFacetConfig) throw(`openAlex error: getFacetConfig: no such key as "${key}"`)

    if (!attr) return myFacetConfig
    if (myFacetConfig) return myFacetConfig[attr]
}

const makeFacet = function (key, isNegated, values) {
    return {
        key,
        isNegated,
        values,
        config: facetConfigs()[key]

    }

}


export {
    makeFacet,
    facetConfigs,
    getFacetConfig,
    facetCategories,
}