"use client";

import { useCallback, useEffect, useState } from 'react'
import { useSolanaWallet } from '@/contexts/SolanaWalletContext'

interface WalletSkillState {
  savedSkillIds: string[]
  purchasedSkillIds: string[]
}

const STORAGE_PREFIX = 'leverbrain.wallet.skills'
const EMPTY_STATE: WalletSkillState = { savedSkillIds: [], purchasedSkillIds: [] }

function uniqueIds(ids: string[]) {
  return Array.from(new Set(ids))
}

function normalizeState(state: Partial<WalletSkillState> | null): WalletSkillState {
  if (!state) {
    return EMPTY_STATE
  }

  return {
    savedSkillIds: uniqueIds(state.savedSkillIds ?? []),
    purchasedSkillIds: uniqueIds(state.purchasedSkillIds ?? []),
  }
}

export function useWalletSkillState() {
  const { connected, walletAddress } = useSolanaWallet()
  const [skillState, setSkillState] = useState<WalletSkillState>(EMPTY_STATE)

  useEffect(() => {
    if (!walletAddress) {
      setSkillState(EMPTY_STATE)
      return
    }

    const rawState = localStorage.getItem(`${STORAGE_PREFIX}:${walletAddress}`)
    if (!rawState) {
      setSkillState(EMPTY_STATE)
      return
    }

    try {
      setSkillState(normalizeState(JSON.parse(rawState)))
    } catch (error) {
      console.error('Invalid wallet skill state JSON', error)
      setSkillState(EMPTY_STATE)
    }
  }, [walletAddress])

  const updateSkillState = useCallback(
    (updater: (current: WalletSkillState) => WalletSkillState) => {
      if (!walletAddress) {
        return
      }

      setSkillState((current) => {
        const nextState = normalizeState(updater(current))
        localStorage.setItem(`${STORAGE_PREFIX}:${walletAddress}`, JSON.stringify(nextState))
        return nextState
      })
    },
    [walletAddress]
  )

  const toggleSavedSkill = useCallback(
    (skillId: string) => {
      updateSkillState((current) => {
        if (current.savedSkillIds.includes(skillId)) {
          return {
            ...current,
            savedSkillIds: current.savedSkillIds.filter((id) => id !== skillId),
          }
        }

        return {
          ...current,
          savedSkillIds: [...current.savedSkillIds, skillId],
        }
      })
    },
    [updateSkillState]
  )

  const purchaseSkill = useCallback(
    (skillId: string) => {
      updateSkillState((current) => ({
        savedSkillIds: uniqueIds([...current.savedSkillIds, skillId]),
        purchasedSkillIds: uniqueIds([...current.purchasedSkillIds, skillId]),
      }))
    },
    [updateSkillState]
  )

  return {
    connected,
    walletAddress,
    savedSkillIds: skillState.savedSkillIds,
    purchasedSkillIds: skillState.purchasedSkillIds,
    toggleSavedSkill,
    purchaseSkill,
  }
}
