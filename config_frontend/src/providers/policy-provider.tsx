import React, { type PropsWithChildren, useEffect, useState } from "react";

import { DEFAULT_POLICY_ID } from "@/config/envs";

import { Policy, PolicyContext } from "@/contexts/policy-context";

import { api } from "@/services/api";
import toast from "react-hot-toast";

export const PolicyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [policy, setPolicy] = useState<Policy | null>(null);

  useEffect(() => {
    getPolicy();
  }, []);

  const getPolicy = async (id?: string) => {
    setLoading(true);

    try {
      const res = await api
        .get(`/policy/${id ?? DEFAULT_POLICY_ID}`)
        .finally(() => {
          setLoading(false);
        });

      setPolicy(res.data);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updatePolicy = async (data: Partial<Policy>) => {
    setLoadingUpdate(true);

    try {
      const res = await api
        .patch(`/policy/${data.id ?? DEFAULT_POLICY_ID}/update`, {
          nodes: data.nodes
        })
        .finally(() => {
          setLoadingUpdate(false);
        });

      setPolicy(res.data);

      return res.data;
    } catch (err: any) {
      const message = err?.response?.data?.error

      if (message  && typeof message === 'string') {
        toast.error(message)
      }

      console.log(err);
    }
  };

  return (
    <PolicyContext.Provider
      value={{ loading, loadingUpdate, policy, updatePolicy }}
    >
      {children}
    </PolicyContext.Provider>
  );
};
