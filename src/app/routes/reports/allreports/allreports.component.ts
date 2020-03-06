import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
declare var $: any;
import { environment } from '../../../../environments/environment';
import { ExportWoffStoryService } from '../../../services/exportwoffstory.service';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';

const actionMapping: IActionMapping = {
    mouse: {
        contextMenu: (tree, node, $event) => {
            $event.preventDefault();
            alert(`context menu for ${node.data.name}`);
        },
        dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        click: (tree, node, $event) => {
            $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
        }
    },
    keys: {
        [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };

@Component({
    selector: 'app-allreports',
    templateUrl: './allreports.component.html',
    styleUrls: ['./allreports.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AllReportsComponent implements OnInit {

    report: string = null;

    nodes: any[] = null;

    asyncChildren = [
        {
            name: 'child2.1',
            subTitle: 'new and improved'
        }, {
            name: 'child2.2',
            subTitle: 'new and improved2'
        }
    ];

    customTemplateStringOptions = {
        // displayField: 'subTitle',
        isExpandedField: 'expanded',
        idField: 'uuid',
        getChildren: this.getChildren.bind(this),
        actionMapping,
        allowDrag: true
    };

    onEvent(msg) {
        console.log(msg);
    }

    constructor(
        private exportWoffstoryservice: ExportWoffStoryService
    ) {
        setTimeout(() => {
            this.nodes = [
                {

                    expanded: true,
                    name: 'Activity Reports',
                    subTitle: 'activity',
                    children: [
                        {
                            name: 'Collector activity',
                            subTitle: 'collector-activity',
                            hasChildren: false
                        }, {

                            name: 'Amount Collectes',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'Portfolio Reports',
                    subTitle: 'the second root',
                    children: [
                        {
                            name: 'child2.1',
                            subTitle: 'new and improved',
                            hasChildren: false
                        }, {

                            name: 'child2.2',
                            subTitle: 'new and improved2',
                            children: [
                                {
                                    uuid: 1001,
                                    name: 'subsub',
                                    subTitle: 'subsub',
                                    hasChildren: false
                                }
                            ]
                        }
                    ]
                },
                {

                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
        }, 1);
    }

    ngOnInit() { }

    getChildren(node: any) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.asyncChildren.map((c) => {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5
                });
            })), 1000);
        });
    }

    addNode(tree) {
        this.nodes[0].children.push({

            name: 'a new child'
        });
        tree.treeModel.update();
    }

    childrenCount(node: TreeNode): string {
        return node && node.children ? `(${node.children.length})` : '';
    }

    filterNodes(text, tree) {
        tree.treeModel.filterNodes(text, true);
    }

    activateSubSub(tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    }

    go($event) {
        $event.stopPropagation();
        alert('this method is on the app component');
    }

    onNavigate(reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    }

    openactivityrpt() {
        window.open(environment.birt + '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report', '_blank');
    }

    open(report) {
        window.open(environment.birt + report, '_blank');
    }

    kibanaopenaccplan() {
        this.report = environment.accplanreport;
        window.open(this.report, '_blank');
    }

    kibanaopenptp() {
        this.report = environment.ptpreport;
        window.open(this.report, '_blank');
    }

    exportwoffstory() {
        this.exportWoffstoryservice.generateWoffstory();
    }

}
