import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  DateVibeId,
  VehicleChoice,
  ChillAudienceChoice,
  PitstopChoice,
  VibeCustomizationState,
  DateTiming,
  DatePlannerState,
} from '../types';

interface DatePlannerContextValue extends DatePlannerState {
  selectVibe: (vibeId: DateVibeId) => void;
  toggleSubChoice: (id: string, multiple?: boolean) => void;
  setVehicleChoice: (vehicle: VehicleChoice) => void;
  setSelectedRoute: (route: string) => void;
  setChillAudience: (audience: ChillAudienceChoice) => void;
  setSelectedSpotId: (spotId: string) => void;
  setCustomSpotName: (name: string) => void;
  setPitstopChoice: (pitstop: PitstopChoice) => void;
  setPreferredTiming: (timing: DateTiming) => void;
  setPreferredDate: (date: string) => void;
  setSpecialNote: (note: string) => void;
  setSubmissionSuccessId: (id: string | null) => void;
  resetAll: () => void;
}

const STORAGE_KEY = 'our_little_date_planner_mobile_v2';

const initialCustomization: VibeCustomizationState = {
  selectedSubChoiceIds: [],
  vehicleChoice: 'scooter',
  selectedRoute: 'Marine Drive Jamshedpur',
  chillAudience: 'just-us',
  selectedSpotId: '',
  customSpotName: '',
};

const initialState: DatePlannerState = {
  selectedVibeId: 'road-ride',
  customization: initialCustomization,
  preferredTiming: 'evening',
  preferredDate: '',
  specialNote: '',
  submissionSuccessId: null,
};

const DatePlannerContext = createContext<DatePlannerContextValue | undefined>(undefined);

export const DatePlannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DatePlannerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load date state from storage', e);
    }
    return initialState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist date state', e);
    }
  }, [state]);

  const selectVibe = (vibeId: DateVibeId) => {
    setState((prev) => {
      // If changing vibe, reset subchoices to sensible defaults for that vibe
      if (prev.selectedVibeId !== vibeId) {
        return {
          ...prev,
          selectedVibeId: vibeId,
          customization: {
            ...initialCustomization,
            vehicleChoice: vibeId === 'road-ride' ? 'scooter' : undefined,
          },
        };
      }
      return prev;
    });
  };

  const toggleSubChoice = (id: string, multiple = false) => {
    setState((prev) => {
      const currentList = prev.customization.selectedSubChoiceIds;
      let updatedList: string[];

      if (multiple) {
        updatedList = currentList.includes(id)
          ? currentList.filter((item) => item !== id)
          : [...currentList, id];
      } else {
        // Single sub-choice mode
        updatedList = [id];
      }

      return {
        ...prev,
        customization: {
          ...prev.customization,
          selectedSubChoiceIds: updatedList,
        },
      };
    });
  };

  const setVehicleChoice = (vehicle: VehicleChoice) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        vehicleChoice: vehicle,
      },
    }));
  };

  const setSelectedRoute = (route: string) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        selectedRoute: route,
      },
    }));
  };

  const setChillAudience = (audience: ChillAudienceChoice) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        chillAudience: audience,
      },
    }));
  };

  const setSelectedSpotId = (spotId: string) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        selectedSpotId: spotId,
      },
    }));
  };

  const setCustomSpotName = (name: string) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        customSpotName: name,
      },
    }));
  };

  const setPitstopChoice = (pitstop: PitstopChoice) => {
    setState((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        pitstopChoice: pitstop,
      },
    }));
  };

  const setPreferredTiming = (timing: DateTiming) => {
    setState((prev) => ({ ...prev, preferredTiming: timing }));
  };

  const setPreferredDate = (date: string) => {
    setState((prev) => ({ ...prev, preferredDate: date }));
  };

  const setSpecialNote = (note: string) => {
    setState((prev) => ({ ...prev, specialNote: note }));
  };

  const setSubmissionSuccessId = (id: string | null) => {
    setState((prev) => ({ ...prev, submissionSuccessId: id }));
  };

  const resetAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  return (
    <DatePlannerContext.Provider
      value={{
        ...state,
        selectVibe,
        toggleSubChoice,
        setVehicleChoice,
        setSelectedRoute,
        setChillAudience,
        setSelectedSpotId,
        setCustomSpotName,
        setPitstopChoice,
        setPreferredTiming,
        setPreferredDate,
        setSpecialNote,
        setSubmissionSuccessId,
        resetAll,
      }}
    >
      {children}
    </DatePlannerContext.Provider>
  );
};

export const useDatePlanner = (): DatePlannerContextValue => {
  const context = useContext(DatePlannerContext);
  if (!context) {
    throw new Error('useDatePlanner must be used within a DatePlannerProvider');
  }
  return context;
};
