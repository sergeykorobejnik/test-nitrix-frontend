import React from 'react';
import styled from "styled-components";

const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  .descr-bold {
    font-weight: 700;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    @media only screen and (min-width: 1280px) {
      font-size: 24px;
    }
  }
  .statistics-descr {
    display: block;
    margin-bottom: 15px;
  }
`

const Statistics = ({taskArr}) => {
    return (
        <StatisticsContainer>
            <span className="statistics-descr">Tasks in pending:
                <span className="descr-bold"> {taskArr.filter(task => task.state === 0 ).length}</span>
            </span>
            <span className="statistics-descr">Completed tasks:
                <span className="descr-bold"> {taskArr.filter(task => task.state === 1 ).length}</span>
            </span>
        </StatisticsContainer>
    );
};

export default Statistics;