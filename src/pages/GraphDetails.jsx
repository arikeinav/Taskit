import React, { Component } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { Line as LineChartData } from 'react-chartjs-2';
import { withRouter } from "react-router";

import { MembersChart } from '../cmps/MembersChart'

const datasetsForLine = [
    {
        label: '',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [0, 3.5, 5, 4, 6, 7, 6, 8],
    },
    {
        label: '',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [0, 3, 4, 5, 7, 5, 7, 7.5],
    },
    {
        label: '',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [0, 3.5, 4, 6, 4.5, 7, 5.5, 7.5],
    },
    {
        label: '',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [0, 1, 2, 1, 1, 3, 2.5, 2],
    },
    {
        label: '',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [0, 0, 0, 0, 0, 0, 0, 0],
    }
]
function lineData(userToShow) {
    return {
        labels: ['Day 0', 'Day 2', 'Day 4', 'Day 6', 'Day 8', 'Day 10', 'Day 12', 'Day 14'],
        datasets: [datasetsForLine[userToShow]]
    }
}
const options = {
    scaleShowGridLines: true,
    scaleGridLineColor: 'rgba(0,0,0,.05)',
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}
const styles = {
    graphContainer: {
        padding: '0 15px 10px'
    }
}
function pieData() {
    const labels = ['Done', 'In progress', 'Task']
    const data = [5, 8, 12]
    return {
        labels,
        datasets: [{
            data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    }
}
function doughnutData() {
    const labels = ['Shahar', 'Arik', 'Shlomi']
    const data = [12, 17, 20]
    return {
        labels,
        datasets: [{
            data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    }
}

class _GraphDetails extends Component {

    state = {
        boardId: null,
        data1: null,
        data2: null,
        data3: null,
        currUser: 'Arik Einav'
    }
    componentDidMount() {
        const { boardId } = this.props.match.params;
        this.setState({ boardId })
        this.setState({ data1: doughnutData() })
        this.setState({ data2: pieData() })
        this.setState({ data3: lineData(0) })
    }
    memberNumber = (userToShow) => {
        console.log("memberNumber -> userToShow", userToShow)
        this.setState({ data3: lineData(userToShow.num) })
        this.setState({ currUser: userToShow.userName })
    }
    backToBoard = () => {
        this.props.history.push(`/board/${this.state.boardId}`)
    }


    render() {

        if (!this.state.data1 || !this.state.data2 || !this.state.data3) return <div>Loading...</div>

        return (
            <div>
                <button className="back-board-btn" onClick={this.backToBoard}>Back</button>

                <div className="flex">
                    <div className="doughnut-chart">
                        <h3>All Tasks</h3>
                        <div className="graph-container">
                            <Doughnut data={this.state.data1} options={options}
                                width={500} height={250} />
                        </div>
                    </div>
                    <div className="pie-chart">
                        <h3>Status per member</h3>
                        <div className="graph-container">
                            <Pie data={this.state.data2} options={options}
                                width={500} height={250} />
                        </div>
                    </div>
                </div>
                <div className="line-chart">
                    <h4>Tasks per day of {`${this.state.currUser}`}</h4>
                    <MembersChart memberNumber={this.memberNumber} />
                    <p>Tasks</p>
                    <div style={styles.graphContainer}>
                        <LineChartData data={this.state.data3}
                            options={options}
                            width={600} height={150} />
                    </div>
                </div>
            </div>
        )
    }
}

export const GraphDetails = withRouter(_GraphDetails)
