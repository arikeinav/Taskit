import React, { Component } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { Line as LineChartData } from 'react-chartjs-2';

import { MembersChart } from '../cmps/MembersChart'

const datasetsForLine = [
    {
        label: 'Arik Einav',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 10],
    },
    {
        label: 'Shlomi Koplianski',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 30],
    },
    {
        label: 'Shahar Sadof',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 50],
    },
    {
        label: 'Meital Lazarovich',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 60],
    },
    {
        label: 'Yaron Biton',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 70],
    }
]
function lineData(userToShow) {
    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
        padding: '0 15px'
    }
}
function pieData() {
    const labels = ['a', 'b', 'c']
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
    const labels = ['a', 'b', 'c']
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

export class GraphDetails extends Component {

    state = {
        boardId: null,
        data1: null,
        data2: null,
        data3: null
    }
    componentDidMount() {
        const { boardId } = this.props.match.params;
        this.setState({ boardId })
        this.setState({ data1: doughnutData() })
        this.setState({ data2: pieData() })
        this.setState({ data3: lineData(0) })
    }
    memberNumber = (userToShow) => {
        console.log("GraphDetails -> memberNumber -> num", userToShow)
        this.setState({ data3: lineData(userToShow) })
    }


    render() {

        if (!this.state.data1 || !this.state.data2 || !this.state.data3) return <div>Loading...</div>

        return (
            <div>
                <div className="flex">
                    <div className="graph-container">
                        <Doughnut data={this.state.data1} options={options}
                            width={500} height={250} />
                    </div>
                    <div className="graph-container">
                        <Pie data={this.state.data2} options={options}
                            width={500} height={250} />
                    </div>
                </div>

                <MembersChart memberNumber={this.memberNumber}/>
                <div style={styles.graphContainer}>
                    <LineChartData data={this.state.data3}
                        options={options}
                        width={600} height={150} />
                </div>
            </div>
        )
    }
}
