import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY)

async function checkColumns() {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching leads:', error)
        return
    }

    if (data && data.length > 0) {
        console.log('Columns found in a record:', Object.keys(data[0]))
    } else {
        // If no records, try to fetch table info via RPC or just assume it's empty
        console.log('No records found to check columns.')
        // Try to insert a dummy record with only basic fields to see if it works
        const { error: insertError } = await supabase.from('leads').insert({
            name: 'Test',
            email: 'test@test.com',
            phone: '123456789'
        })
        if (insertError) {
            console.error('Basic insert failed:', insertError)
        } else {
            console.log('Basic insert succeeded.')
        }
    }
}

checkColumns()
