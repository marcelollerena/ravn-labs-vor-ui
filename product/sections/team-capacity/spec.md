# Team Capacity Specification

## Overview
Admin-only view for reviewing the active recruiter and senior developer roster, understanding interview availability, and assigning people to job requisitions based on current workload. This view gives staffing visibility without changing the rest of the hiring workflow screens.

## User Flows
- View all registered recruiters and senior developers in one place
- See whether each person is currently available for new interview work
- See how many active hiring processes each person is currently assigned to
- Filter the directory by role, availability, department, or workload level
- Open a person record to inspect which job requisitions and candidates are contributing to their current load
- Assign or reassign a recruiter or senior developer to a job requisition

## UI Requirements
- Directory layout with rows or cards for each team member
- Each team member entry shows: name, role, availability status, number of active job requisitions, number of active candidates, and latest assignment activity
- Filter controls for role, availability, and load
- Workload indicator using simple counts and a visual state such as available / busy / overloaded
- Quick assignment action that lets an admin attach the person to a job requisition
- Drill-in panel or detail state showing current requisitions and candidate counts behind the workload total
- Empty state if no interviewers have been registered yet
- Responsive layout that preserves scanability on smaller screens

## Configuration
- shell: true
