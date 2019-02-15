
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Dashboard = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Dashbord Portfolio',
            link: '/dashboard/v1'
        },
        {
            text: 'Dashbord Activity',
            link: '/dashboard/v2'
        }
    ]
};

const DashboardAdmin = {
    text: 'Dashboard',
    link: '/dashboard',
    icon: 'icon-speedometer',
    submenu: [
        {
            text: 'Performance Metrics',
            link: '/dashboard/v3'
        }
    ]
};

const Letters = {
    text: 'Leters',
    link: '/letters',
    icon: 'icon-note',
    submenu: [
        /*{
            text: 'Settings',
            link: '/letters/settings'
        },*/
        {
            text: 'Guarantors',
            link: '/guarantors',
            submenu: [
                {
                    text: 'list',
                    link: '/guarantors/list'
                },
                {
                    text: 'New',
                    link: '/guarantors/newguarantor'
                }
            ]
        },
        {
            text: 'Demand Letters',
            link: '/demand',
            submenu: [
                {
                    text: 'Letters Due',
                    link: '/demand/demands'
                },
                {
                    text: 'Sent History',
                    link: '/demand/demandhistory'
                },
                /*{
                    text: 'Pre Listing',
                    link: '/demand/prelisting'
                },
                {
                    text: 'Post Listing',
                    link: '/demand/postlisting'
                },
                {
                    text: '40 Day',
                    link: '/demand/day40'
                },
                {
                    text: '90 Day',
                    link: '/demand/day90'
                }*/
            ]
        }
    ],
    'alert': '23',
    'label': 'badge badge-warning'
};

const Administration = {
    text: 'Administration',
    link: '/admin',
    icon: 'icon-settings',
    submenu: [
        {
            text: 'Users',
            link: '/users/search'
        },
        {
            text: 'Roles',
            link: '/users/roles'
        },
        {
            text: 'Approvals',
            link: '/users/approvals'
        }
    ]
};

const Elements = {
    text: 'Elements',
    link: '/elements',
    icon: 'icon-chemistry',
    submenu: [
        {
            text: 'Buttons',
            link: '/elements/buttons'
        },
        {
            text: 'Interaction',
            link: '/elements/interaction'
        },
        {
            text: 'Notification',
            link: '/elements/notification'
        },
        {
            text: 'SweetAlert',
            link: '/elements/sweetalert'
        },
        {
            text: 'Spinners',
            link: '/elements/spinners'
        },
        {
            text: 'Dropdown',
            link: '/elements/dropdown'
        },
        {
            text: 'Nav Tree',
            link: '/elements/navtree'
        },
        {
            text: 'Sortable',
            link: '/elements/sortable'
        },
        {
            text: 'Grid',
            link: '/elements/grid'
        },
        {
            text: 'Grid Masonry',
            link: '/elements/gridmasonry'
        },
        {
            text: 'Typography',
            link: '/elements/typography'
        },
        {
            text: 'Font Icons',
            link: '/elements/iconsfont'
        },
        {
            text: 'Weahter Icons',
            link: '/elements/iconsweather'
        },
        {
            text: 'Colors',
            link: '/elements/colors'
        },
        {
            text: 'Infinite Scroll',
            link: '/elements/infinitescroll'
        }
    ]
};

const Forms = {
    text: 'Forms',
    link: '/forms',
    icon: 'icon-note',
    submenu: [
        {
            text: 'Standard',
            link: '/forms/standard'
        },
        {
            text: 'Extended',
            link: '/forms/extended'
        },
        {
            text: 'Validation',
            link: '/forms/validation'
        },
        {
            text: 'Upload',
            link: '/forms/upload'
        },
        {
            text: 'Image Crop',
            link: '/forms/cropper'
        }
    ]
};

const Charts = {
    text: 'Charts',
    link: '/charts',
    icon: 'icon-graph',
    submenu: [
        {
            text: 'Flot',
            link: '/charts/flot'
        },
        {
            text: 'Radial',
            link: '/charts/radial'
        },
        {
            text: 'ChartJS',
            link: '/charts/chartjs'
        }
    ]
};

const Tables = {
    text: 'Tables',
    link: '/tables',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Standard',
            link: '/tables/standard'
        },
        {
            text: 'Extended',
            link: '/tables/extended'
        },
        {
            text: 'Data-Tables',
            link: '/tables/datatable'
        },
        {
            text: 'Angular Grid',
            link: '/tables/aggrid'
        },
        {
            text: 'NGxDatatables',
            link: '/tables/ngxdatatable'
        }
    ]
};

const Collectionrpt = {
    text: 'Collection Reports',
    link: '/collectionrpts',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Collector activity',
            link: '/tables/standard'
        },
        {
            text: 'Amount collected',
            link: '/tables/extended'
        },
        {
            text: 'SMS report',
            link: '/tables/datatable'
        },
        {
            text: 'Daily notes',
            link: '/tables/aggrid'
        },
        {
            text: 'Bulk notes',
            link: '/tables/ngxdatatable'
        }
    ]
};

const Remedialrpts = {
    text: 'Remedial Reports',
    link: '/collectionrpts',
    icon: 'icon-grid',
    submenu: [
        {
            text: 'Unactioned report',
            link: '/tables/standard'
        },
        {
            text: 'New File Analysis',
            link: '/tables/extended'
        },
        {
            text: 'Portfolio Movement',
            link: '/tables/datatable'
        },
        {
            text: 'Relegation Analysis',
            link: '/tables/aggrid'
        },
        {
            text: 'Relegation analysis cc',
            link: '/tables/ngxdatatable'
        },
        {
            text: 'Portfolio movement cc',
            link: '/tables/aggrid'
        },
        {
            text: 'Invoices',
            link: '/tables/ngxdatatable'
        },
        {
            text: 'More',
            link: '/tables/ngxdatatable',
            submenu: [
                {
                    text: 'Unactioned report',
                    link: '/tables/standard'
                }
            ]
        }
    ]
};

const Remedialrpt = {
    text: 'Remedial Reports',
    link: '/remedialrpts',
    icon: 'icon-graph',
    submenu: [
        {
            text: 'Unactioned report',
            link: '/remedialrpts/unactionedrpt'
        },
        {
            text: 'New File Analysis',
            link: '/remedialrpts/newfileanalysis'
        },
        {
            text: 'Portfolio Movement',
            link: '/remedialrpts/portfoliomvt'
        },
        {
            text: 'Relegation Analysis',
            link: '/remedialrpts/relegationanalysis'
        },
        {
            text: 'Invoices',
            link: '/remedialrpts/invoices'
        },
        {
            text: 'Portfolio movement cc',
            link: '/remedialrpts/portfoliomvt'
        },
        {
            text: 'Relegation analysis cc',
            link: '/remedialrpts/relegationanalysis'
        }
    ]
};

const Maps = {
    text: 'Maps',
    link: '/maps',
    icon: 'icon-map',
    submenu: [
        {
            text: 'Google',
            link: '/maps/google'
        },
        {
            text: 'Vector',
            link: '/maps/vector'
        }
    ]
};

const Pages = {
    text: 'Pages',
    link: '/pages',
    icon: 'icon-doc',
    submenu: [
        {
            text: 'Login',
            link: '/login'
        },
        {
            text: 'Register',
            link: '/register'
        },
        {
            text: 'Recover',
            link: '/recover'
        },
        {
            text: 'Lock',
            link: '/lock'
        },
        {
            text: '404',
            link: '/404'
        },
        {
            text: '500',
            link: '/500'
        },
        {
            text: 'Maintenance',
            link: '/maintenance'
        }
    ]
};

const Blog = {
    text: 'Blog',
    link: '/blog',
    icon: 'icon-notebook',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        },
        {
            text: 'Articles',
            link: '/blog/articles'
        },
        {
            text: 'Article View',
            link: '/blog/articleview'
        }
    ]
};

const Work = {
    text: 'Work Queue',
    link: '/work',
    icon: 'icon-briefcase',
    submenu: [
        {
            text: 'View all',
            link: '/work/viewall',
            'alert': '23',
            'label': 'badge badge-warning'
        },
        {
            text: 'My allocations',
            link: '/work/myallocations'
        },
        {
            text: 'Todays',
            link: '/work/todays'
        },
        {
            text: 'Pre Delinquent',
            link: '/work/predelinquent'
        },
        {
            text: 'PTP Due',
            link: '/work/ptps'
        },
        {
            text: 'With funds',
            link: '/work/withfunds'
        }
    ]
};

const creditcards = {
    text: 'Credit Cards',
    link: '/creditcards',
    icon: 'icon-credit-card',
    submenu: [
        {
            text: 'Todays Work',
            link: '/creditcards/list'
        },
        {
            text: 'My Worklist',
            link: '/creditcards/post'
        },
        {
            text: 'My Allocations',
            link: '/creditcards/list'
        },
        {
            text: 'Post',
            link: '/creditcards/post'
        },
        {
            text: 'List',
            link: '/creditcards/list'
        },
        {
            text: 'Post',
            link: '/creditcards/post'
        }
    ]
};

const Remedial = {
    text: 'Remedial',
    link: '/remedial',
    icon: 'icon-equalizer',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        }
    ]
};

const serviceproviders = {
    text: 'Service Providers',
    link: '/serviceproviders',
    icon: 'icon-drawer',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        }
    ]
};

const mcoopcash = {
    text: 'M-Coop Cash',
    link: '/mcoopcash',
    icon: 'icon-wallet',
    submenu: [
        {
            text: 'List',
            link: '/blog/list'
        },
        {
            text: 'Post',
            link: '/blog/post'
        }
    ]
};

const Demandletters = {
    text: 'Demand Letters',
    link: '/letters/settings',
    icon: 'icon-envelope-letter'
};

const Allocations = {
    text: 'Account allocations',
    link: '/configurations/allocations',
    icon: 'icon-people'
};

const SMS = {
    text: 'SMS',
    link: '/configurations/sms',
    icon: 'icon-note'
};


const headingMain = {
    text: 'Main Navigation',
    heading: true
};

const headingComponents = {
    text: 'Work Queue',
    heading: true
};

const headingMore = {
    text: 'Reports',
    heading: true
};

const headingConfigurations = {
    text: 'Configurations',
    heading: true
};

// user permissions
const userperm = JSON.parse(localStorage.getItem('userpermission'));
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

console.log('menu', userperm);
console.log('currentUser', currentUser);

let menuitems = [];

const user_mgmt_menu = [
    headingMain,
    Home,
    DashboardAdmin,
    Administration,
    // Letters,
    // headingComponents,
    // Work,
    // Pages,
   /* Elements,
    Forms,
    Charts,
    Blog,
    Maps,*/
    headingMore,
    Collectionrpt,
    Remedialrpts
    // Tables,
   // Ecommerce,
   // Extras
];

const collection_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    Remedial,
    mcoopcash,
    serviceproviders,
    creditcards,
    headingMore,
    Collectionrpt,
    Remedialrpts,
    headingConfigurations,
    Demandletters,
    Allocations,
    SMS
];

const creditcards_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    headingMore,
    Collectionrpt,
    Remedialrpts
];

const remedial_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    headingMore,
    Collectionrpt,
    Remedialrpts
];

const teamleader_menu = [
    headingMain,
    Home,
    Dashboard,
    Letters,
    headingComponents,
    Work,
    headingMore,
    Collectionrpt,
    Remedialrpts,
    headingConfigurations,
    Demandletters,
    Allocations,
    SMS
];

if (currentUser !== null) {
    if (currentUser.role === 'admin' ) {
        menuitems = user_mgmt_menu;
    } else {
        menuitems = collection_menu;
    }
} else {
    menuitems = collection_menu;
}


export const menu = menuitems;
