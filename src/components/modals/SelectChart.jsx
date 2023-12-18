import React, { useEffect, useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import TimelineIcon from "@mui/icons-material/Timeline";

import { setChartList } from "../../redux/slices/employeSlice";

function SelectChart({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [selectChartState, setSelectChartState] = useState({
    chartType: "",
    chartTitle: "",
    field: "status",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleChartListSubmit(e) {
    e.preventDefault();
    dispatch(setChartList(selectChartState));
    setIsOpen(false);
    setSelectChartState({
      chartType: "",
      chartTitle: "",
      field: "stauts",
    });
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form className="form" onSubmit={handleChartListSubmit}>
          <h2>Select Chart Type</h2>
          <div className="charts-list">
            <label
              htmlFor="bar"
              className={
                selectChartState.chartType == "bar-chart" ? "chart-select" : ""
              }
            >
              <input
                type="radio"
                id="bar"
                name="chart-type"
                value="bar-chart"
                required
                hidden
                onChange={(e) => {
                  setSelectChartState((state) => ({
                    ...state,
                    chartType: e.target.value,
                  }));
                }}
              />
              <BarChartIcon fontSize="large" />
            </label>
            <br />
            <label
              htmlFor="line"
              className={
                selectChartState.chartType == "line-chart" ? "chart-select" : ""
              }
            >
              <input
                type="radio"
                id="line"
                name="chart-type"
                value="line-chart"
                required
                hidden
                onChange={(e) => {
                  setSelectChartState((state) => ({
                    ...state,
                    chartType: e.target.value,
                  }));
                }}
              />
              <TimelineIcon fontSize="large" />
            </label>
            <label
              htmlFor="pie"
              className={
                selectChartState.chartType == "pie-chart" ? "chart-select" : ""
              }
            >
              <input
                type="radio"
                id="pie"
                name="chart-type"
                value="pie-chart"
                required
                hidden
                onChange={(e) => {
                  setSelectChartState((state) => ({
                    ...state,
                    chartType: e.target.value,
                  }));
                }}
              />
              <DonutLargeIcon fontSize="large" />
            </label>
          </div>
          <h2>Chart Setting</h2>
          <input
            type="text"
            name="chart-tite"
            id="chart-tite"
            placeholder="enter chart title"
            required
            onChange={(e) => {
              setSelectChartState((state) => ({
                ...state,
                chartTitle: e.target.value,
              }));
            }}
          />
          <select
            name="field"
            required
            className="select-input"
            onChange={(e) => {
              setSelectChartState((state) => ({
                ...state,
                field: e.target.value,
              }));
            }}
          >
            <option value="status">based on status</option>
            <option value="location">based on location</option>
          </select>
          <button type="submit">submit</button>
        </form>
      </Box>
    </Modal>
  );
}

export default SelectChart;
