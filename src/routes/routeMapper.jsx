/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-unused-vars
import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../components/shared/Loader/index";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { routepath } from "../constants/routepath";
// Lazy-loaded Components
const Login = lazy(() => import("../components/auth/Login"));
const Dashboard = lazy(() => import("../components/dashboard"));
const NotFound = lazy(() => import("../components/shared/notFound"));
const User = lazy(() => import("../components/users/index"));
const ExamReport = lazy(() => import("../components/examreport"));
const Notifications = lazy(() => import("../components/notifications"));
const Profile = lazy(() => import("../components/profile"));
// exams
const CareerInterestExam = lazy(() =>
  import("../components/exams/careerinterestexam")
);
const ReasoningExam = lazy(() => import("../components/exams/reasoningexam"));
const PsycometricExam = lazy(() =>
  import("../components/exams/psycometricexam")
);
const CareerClusterExam = lazy(() =>
  import("../components/exams/careerclusterexam")
);

const routeMapper = () => {
  return [
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        </PublicRoute>
      ),
      exact: true,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        </PrivateRoute>
      ),
      exact: true,
    },
    {
      path: "/user",
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <User />
            </Suspense>
          ),
        },
        {
          path: ":action/:id",
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <User />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.examReport,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <ExamReport />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.notifications,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Notifications />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.profile,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.reasoningExam+"/:quid"+"/:tottime",
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <ReasoningExam />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.psycometricExam,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <PsycometricExam />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.careerClusterExam,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <CareerClusterExam />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: routepath.careerInterestExam,
      element: (
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      ),
      exact: true,
      children: [
        {
          index: true,
          exact: true,
          element: (
            <Suspense fallback={<Loader />}>
              <CareerInterestExam />
            </Suspense>
          ),
        },
      ],
    },
    {
      // Invalid Route
      path: "*",
      element: (
        <PrivateRoute>
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        </PrivateRoute>
      ),
    },
  ];
};

export default routeMapper;
